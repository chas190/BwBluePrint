import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SectionMenu, SectionTagsList } from './components/section-menu';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Edit3,
  FolderPlus,
  GripVertical,
  Layers,
  MoreHorizontal,
  MoveRight,
  Pencil,
  Pin,
  PinOff,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Star,
  StickyNote,
  Trash2,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import {
  canWriteDashboard,
  duplicateApp as duplicateAppRecord,
  insertAppInSection,
  moveAppOrder,
  moveAppToSectionOrder,
  normalizeAppOrders,
  normalizeSectionOrders,
  readDashboardStorage,
  reorderSection,
  type AppLink,
  type Note,
  type Priority,
  type Section,
  type StoreData,
} from './dashboard-model';

const priorityLabels: Record<Priority, string> = {
  p1: 'P1 Critical',
  p2: 'P2 High',
  p3: 'P3 Normal',
  p4: 'P4 Low',
  none: 'None',
};

type SortMode = 'custom' | 'priority' | 'alpha' | 'recent' | 'used' | 'added';
type FilterState = { sectionId: string; tag: string; priority: string; favorites: boolean };
type DragTarget = { sectionId: string; appId?: string };
type DragSession = {
  appId: string;
  mode: 'mouse' | 'touch';
  pointerId?: number;
  touchId?: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  active: boolean;
  timer?: number;
  animationFrame?: number;
  cleanup: (clearUi?: boolean) => void;
};

const optimizedLocalAsset = (name: string) => name.replace(/^(town-grid|business-desk|sports-motion|dev-terminal)\.png$/, '$1.webp');
const asset = (name: string) => `${import.meta.env.BASE_URL}${optimizedLocalAsset(name)}`;
const STORAGE_KEY = 'applink-dashboard-v2';

function migrateLocalImageUrl(value: string) {
  const localAssetNames = ['town-grid', 'business-desk', 'sports-motion', 'dev-terminal'];
  const legacyAsset = localAssetNames.find((name) => value === `${import.meta.env.BASE_URL}${name}.png`);
  return legacyAsset ? asset(`${legacyAsset}.webp`) : value;
}

const seedSections: Section[] = [
  { id: 'town', title: 'BW TOWN', tags: ['community', 'local'], priority: 'p1', sortOrder: 0, collapsed: false },
  { id: 'business', title: 'BUSINESS', tags: ['work', 'daily'], priority: 'p2', sortOrder: 1, collapsed: false },
  { id: 'upsports', title: 'UPSPORTS', tags: ['sports', 'community'], priority: 'p3', sortOrder: 2, collapsed: false },
  { id: 'development', title: 'DEVELOPMENT', tags: ['build', 'tools'], priority: 'p2', sortOrder: 3, collapsed: false },
];

const seedApps: Omit<AppLink, 'createdAt'>[] = [
  { id: 'bwtown', sectionId: 'town', name: 'BWTown', description: 'Your neighborhood, all in one place.', url: 'https://www.google.com/search?q=BWTown', imageUrl: asset('town-grid.png'), icon: 'BT', overlayColor: '#24409a', overlayOpacity: .35, tags: ['local', 'community'], priority: 'p1', favorite: true, sortOrder: 0, launchCount: 18, lastOpenedAt: '2026-09-29T10:21:00.000Z', notes: [{ id: 'note-town-1', text: 'Check the community calendar before the weekend.', pinned: true, createdAt: '2026-09-20T10:00:00.000Z', updatedAt: '2026-09-20T10:00:00.000Z' }] },
  { id: 'bwmarket', sectionId: 'town', name: 'BWMarket', description: 'Find and share what is made nearby.', url: 'https://www.google.com/search?q=BWMarket', imageUrl: asset('business-desk.png'), icon: 'BM', overlayColor: '#df6b4e', overlayOpacity: .32, tags: ['local', 'shopping'], priority: 'p2', favorite: false, sortOrder: 1, launchCount: 7, lastOpenedAt: '2026-09-28T16:03:00.000Z', notes: [] },
  { id: 'bwsearch', sectionId: 'town', name: 'BWSearch', description: 'A quick way to find local places.', url: 'https://www.google.com/search?q=BWSearch', imageUrl: asset('sports-motion.png'), icon: 'BS', overlayColor: '#1d5675', overlayOpacity: .3, tags: ['local', 'search'], priority: 'p3', favorite: true, sortOrder: 2, launchCount: 22, lastOpenedAt: '2026-09-27T08:42:00.000Z', notes: [] },
  { id: 'bwfarm', sectionId: 'town', name: 'BWFarms', description: 'Meet the growers behind local food.', url: 'https://www.google.com/search?q=BWFarms', imageUrl: asset('dev-terminal.png'), icon: 'BF', overlayColor: '#2d5a3c', overlayOpacity: .3, tags: ['local', 'farms'], priority: 'p4', favorite: false, sortOrder: 3, launchCount: 4, lastOpenedAt: null, notes: [] },
  { id: 'crm', sectionId: 'business', name: 'CRM', description: 'Keep relationships and follow-ups close.', url: 'https://www.hubspot.com/products/crm', imageUrl: asset('business-desk.png'), icon: 'CRM', overlayColor: '#203b30', overlayOpacity: .33, tags: ['business', 'customers'], priority: 'p1', favorite: true, sortOrder: 0, launchCount: 31, lastOpenedAt: '2026-09-29T09:18:00.000Z', notes: [{ id: 'note-crm-1', text: 'Review the new leads before the Friday check-in.', pinned: true, createdAt: '2026-09-18T14:00:00.000Z', updatedAt: '2026-09-18T14:00:00.000Z' }] },
  { id: 'email', sectionId: 'business', name: 'Email', description: 'A quieter route to the important messages.', url: 'https://mail.google.com', imageUrl: asset('dev-terminal.png'), icon: 'EM', overlayColor: '#b44d3e', overlayOpacity: .25, tags: ['business', 'daily'], priority: 'p2', favorite: false, sortOrder: 1, launchCount: 14, lastOpenedAt: '2026-09-26T14:11:00.000Z', notes: [] },
  { id: 'calendar', sectionId: 'business', name: 'Calendar', description: 'See what is next and make room for it.', url: 'https://calendar.google.com', imageUrl: asset('town-grid.png'), icon: 'CA', overlayColor: '#375bd2', overlayOpacity: .25, tags: ['business', 'daily'], priority: 'p2', favorite: true, sortOrder: 2, launchCount: 11, lastOpenedAt: '2026-09-28T11:32:00.000Z', notes: [{ id: 'note-calendar-1', text: 'Block a little focus time before the afternoon calls.', pinned: false, createdAt: '2026-09-22T08:30:00.000Z', updatedAt: '2026-09-22T08:30:00.000Z' }] },
  { id: 'accounting', sectionId: 'business', name: 'Accounting', description: 'A clear view of the numbers behind the work.', url: 'https://quickbooks.intuit.com/', imageUrl: asset('sports-motion.png'), icon: 'AC', overlayColor: '#5c493e', overlayOpacity: .3, tags: ['business', 'finance'], priority: 'p3', favorite: false, sortOrder: 3, launchCount: 2, lastOpenedAt: null, notes: [] },
  { id: 'league-dashboard', sectionId: 'upsports', name: 'League Dashboard', description: 'Scores, schedules, and the season at a glance.', url: 'https://www.espn.com/', imageUrl: asset('sports-motion.png'), icon: 'LD', overlayColor: '#c54832', overlayOpacity: .33, tags: ['sports', 'league'], priority: 'p1', favorite: true, sortOrder: 0, launchCount: 9, lastOpenedAt: '2026-09-29T07:30:00.000Z', notes: [] },
  { id: 'teams', sectionId: 'upsports', name: 'Teams', description: 'The people who make game day happen.', url: 'https://teams.microsoft.com/', imageUrl: asset('dev-terminal.png'), icon: 'TM', overlayColor: '#263d92', overlayOpacity: .3, tags: ['sports', 'teams'], priority: 'p2', favorite: false, sortOrder: 1, launchCount: 4, lastOpenedAt: null, notes: [] },
  { id: 'events', sectionId: 'upsports', name: 'Events', description: 'Find the next match or meetup.', url: 'https://www.eventbrite.com/', imageUrl: asset('town-grid.png'), icon: 'EV', overlayColor: '#8b5c2b', overlayOpacity: .3, tags: ['sports', 'events'], priority: 'p3', favorite: false, sortOrder: 2, launchCount: 6, lastOpenedAt: '2026-09-24T12:20:00.000Z', notes: [] },
  { id: 'community', sectionId: 'upsports', name: 'Community', description: 'Stay close to the people in the stands.', url: 'https://discord.com/', imageUrl: asset('business-desk.png'), icon: 'CO', overlayColor: '#34443a', overlayOpacity: .3, tags: ['sports', 'community'], priority: 'p4', favorite: false, sortOrder: 3, launchCount: 1, lastOpenedAt: null, notes: [] },
  { id: 'replit', sectionId: 'development', name: 'Replit', description: 'Start building from wherever you are.', url: 'https://replit.com/', imageUrl: asset('dev-terminal.png'), icon: 'R', overlayColor: '#122c2b', overlayOpacity: .42, tags: ['code', 'build'], priority: 'p1', favorite: true, sortOrder: 0, launchCount: 27, lastOpenedAt: '2026-09-29T10:37:00.000Z', notes: [] },
  { id: 'github', sectionId: 'development', name: 'GitHub', description: 'Ship the thing. Then make it cleaner.', url: 'https://github.com/', imageUrl: asset('town-grid.png'), icon: 'GH', overlayColor: '#375bd2', overlayOpacity: .25, tags: ['code', 'ship'], priority: 'p1', favorite: true, sortOrder: 1, launchCount: 23, lastOpenedAt: '2026-09-28T17:15:00.000Z', notes: [] },
  { id: 'supabase', sectionId: 'development', name: 'Supabase', description: 'Keep the data layer close to the app.', url: 'https://supabase.com/', imageUrl: asset('business-desk.png'), icon: 'S', overlayColor: '#8db72e', overlayOpacity: .25, tags: ['code', 'database'], priority: 'p2', favorite: false, sortOrder: 2, launchCount: 15, lastOpenedAt: '2026-09-25T13:20:00.000Z', notes: [] },
  { id: 'clerk', sectionId: 'development', name: 'Clerk', description: 'Build the sign-in experience for your app.', url: 'https://clerk.com/', imageUrl: asset('sports-motion.png'), icon: 'C', overlayColor: '#8c3b65', overlayOpacity: .25, tags: ['code', 'auth'], priority: 'p3', favorite: false, sortOrder: 3, launchCount: 5, lastOpenedAt: null, notes: [] },
];

const freshStore = (): StoreData => {
  const seedTime = Date.now();
  return { sections: seedSections, apps: seedApps.map((app, index) => ({ ...app, createdAt: new Date(seedTime - (seedApps.length - index) * 1000).toISOString() })) };
};

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatDate(value: string | null) {
  if (!value) return 'Not opened yet';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));
}

function getInitials(name: string) {
  return name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase();
}

function isSafeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function App() {
  const [initialStore] = useState(() => readDashboardStorage(() => localStorage.getItem(STORAGE_KEY), migrateLocalImageUrl));
  const [data, setData] = useState<StoreData>(initialStore.status === 'valid' ? initialStore.data : freshStore());
  const [storageNotice, setStorageNotice] = useState<string | null>(initialStore.warning);
  const [persistenceBlocked, setPersistenceBlocked] = useState(!canWriteDashboard(initialStore));
  const [recoveryRaw] = useState(initialStore.raw);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('custom');
  const [filters, setFilters] = useState<FilterState>({ sectionId: 'all', tag: 'all', priority: 'all', favorites: false });
  const [editMode, setEditMode] = useState(false);
  const [modal, setModal] = useState<'app' | 'section' | 'filters' | 'notes' | 'confirm' | 'move' | 'app-confirm' | 'storage-recovery' | 'restore-confirm' | 'section-tags' | null>(null);
  const [tagsSectionId, setTagsSectionId] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<AppLink | null>(null);
  const [movingApp, setMovingApp] = useState<AppLink | null>(null);
  const [deletingApp, setDeletingApp] = useState<AppLink | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [notesAppId, setNotesAppId] = useState<string | null>(null);
  const [confirmSectionId, setConfirmSectionId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [draggingAppId, setDraggingAppId] = useState<string | null>(null);
  const [dragTarget, setDragTarget] = useState<DragTarget | null>(null);
  const dragSessionRef = useRef<DragSession | null>(null);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  useEffect(() => {
    if (persistenceBlocked) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStorageError(null);
    } catch {
      setStorageError('Changes could not be saved on this device. Free up browser storage or enable local storage before relying on this dashboard.');
    }
  }, [data, persistenceBlocked]);

  useEffect(() => () => dragSessionRef.current?.cleanup(false), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const allTags = useMemo(() => Array.from(new Set([...data.apps.flatMap((app) => app.tags), ...data.sections.flatMap((section) => section.tags)])).sort(), [data.apps, data.sections]);
  const filteredApps = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return data.apps.filter((app) => {
      const section = data.sections.find((item) => item.id === app.sectionId);
      const searchable = [app.name, app.description, app.url, ...app.tags, ...(app.notes ?? []).map((note) => note.text), section?.title ?? '', ...(section?.tags ?? [])].join(' ').toLowerCase();
      const matchesTag = filters.tag === 'all' || app.tags.includes(filters.tag) || (section?.tags ?? []).includes(filters.tag);
      return (!needle || searchable.includes(needle))
        && (filters.sectionId === 'all' || app.sectionId === filters.sectionId)
        && matchesTag
        && (filters.priority === 'all' || app.priority === filters.priority)
        && (!filters.favorites || app.favorite);
    });
  }, [data.apps, data.sections, filters, search]);

  const sortedSections = useMemo(() => [...data.sections].sort((a, b) => a.sortOrder - b.sortOrder), [data.sections]);
  const activeFilterCount = [filters.sectionId !== 'all', filters.tag !== 'all', filters.priority !== 'all', filters.favorites].filter(Boolean).length;
  const dragEnabled = editMode && sortMode === 'custom' && !search.trim() && activeFilterCount === 0;

  const updateApp = (id: string, patch: Partial<AppLink>) => {
    setData((current) => ({ ...current, apps: current.apps.map((app) => app.id === id ? { ...app, ...patch } : app) }));
  };

  const launchApp = (app: AppLink) => {
    if (!isSafeHttpUrl(app.url)) { setToast('This link has an unsafe or invalid URL. Edit it to use http or https.'); return; }
    updateApp(app.id, { launchCount: app.launchCount + 1, lastOpenedAt: new Date().toISOString() });
    window.open(app.url, '_blank', 'noopener,noreferrer');
    setToast(`${app.name} opened`);
  };

  const toggleFavorite = (app: AppLink) => {
    updateApp(app.id, { favorite: !app.favorite });
    setToast(app.favorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const toggleSection = (sectionId: string) => {
    setData((current) => ({ ...current, sections: current.sections.map((section) => section.id === sectionId ? { ...section, collapsed: !section.collapsed } : section) }));
  };

  const moveApp = (app: AppLink, direction: -1 | 1, visibleOrder?: string[]) => {
    setData((current) => ({ ...current, apps: moveAppOrder(current.apps, app.id, direction, visibleOrder) }));
    setSortMode('custom');
  };

  const moveSection = (section: Section, direction: -1 | 1) => {
    setData((current) => ({ ...current, sections: reorderSection(current.sections, section.id, direction) }));
  };

  const saveApp = (app: AppLink) => {
    setData((current) => {
      const exists = current.apps.some((item) => item.id === app.id);
      const old = current.apps.find((item) => item.id === app.id);
      const sectionChanged = old && old.sectionId !== app.sectionId;
      const destinationOrder = current.apps.filter((item) => item.sectionId === app.sectionId && item.id !== app.id).length;
      const saved = { ...app, createdAt: old?.createdAt ?? app.createdAt ?? new Date().toISOString(), sortOrder: sectionChanged || !exists ? destinationOrder : app.sortOrder };
      return { ...current, apps: normalizeAppOrders(exists ? current.apps.map((item) => item.id === app.id ? saved : item) : [...current.apps, saved]) };
    });
    setModal(null);
    setToast(existsApp(data.apps, app.id) ? 'App link updated' : 'App link added');
  };

  const deleteApp = (appId: string) => {
    setData((current) => ({ ...current, apps: normalizeAppOrders(current.apps.filter((app) => app.id !== appId)) }));
    setModal(null);
    setDeletingApp(null);
    setToast('App link removed');
  };

  const duplicateApp = (app: AppLink) => {
    const now = new Date().toISOString();
    const duplicate = { ...duplicateAppRecord(app, (prefix) => makeId(prefix), now), sortOrder: data.apps.filter((item) => item.sectionId === app.sectionId).length };
    setData((current) => ({ ...current, apps: normalizeAppOrders([...current.apps, duplicate]) }));
    setToast('App link duplicated');
  };

  const moveAppToSection = (app: AppLink, sectionId: string) => {
    setData((current) => {
      if (!current.sections.some((section) => section.id === sectionId)) return current;
      return { ...current, apps: moveAppToSectionOrder(current.apps, app.id, sectionId) };
    });
    setModal(null);
    setMovingApp(null);
    setToast('App link moved');
  };

  const reorderDraggedApp = (appId: string, sectionId: string, targetId?: string) => {
    setData((current) => {
      if (!current.sections.some((section) => section.id === sectionId)) return current;
      return { ...current, apps: insertAppInSection(current.apps, appId, sectionId, targetId) };
    });
  };

  const resolveDropTarget = (x: number, y: number, draggedAppId: string) => {
    const element = document.elementFromPoint(x, y);
    const card = element?.closest<HTMLElement>('[data-app-id]');
    if (card?.dataset.appId === draggedAppId) return null;
    const sectionId = card?.closest<HTMLElement>('[data-section-id]')?.dataset.sectionId
      ?? element?.closest<HTMLElement>('[data-section-id]')?.dataset.sectionId;
    if (!sectionId) return null;
    let beforeId = card?.dataset.appId;
    if (card && beforeId && y > card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2) {
      let next = card.nextElementSibling as HTMLElement | null;
      while (next?.dataset.appId === draggedAppId) next = next.nextElementSibling as HTMLElement | null;
      beforeId = next?.dataset.appId;
    }
    return { target: { sectionId, appId: card?.dataset.appId }, beforeId };
  };

  const commitDragAt = (session: DragSession) => {
    const drop = resolveDropTarget(session.x, session.y, session.appId);
    if (drop) reorderDraggedApp(session.appId, drop.target.sectionId, drop.beforeId);
  };

  const refreshDragTarget = (session: DragSession) => {
    const drop = resolveDropTarget(session.x, session.y, session.appId);
    setDragTarget(drop?.target ?? null);
  };

  const beginAutoScroll = (session: DragSession) => {
    if (session.animationFrame !== undefined) return;
    const tick = () => {
      if (dragSessionRef.current !== session || !session.active) return;
      const edge = 76;
      const distanceFromBottom = window.innerHeight - session.y;
      let scrollDelta = 0;
      if (session.y < edge) scrollDelta = -Math.max(3, Math.round((edge - session.y) / 5));
      else if (distanceFromBottom < edge) scrollDelta = Math.max(3, Math.round((edge - distanceFromBottom) / 5));
      if (scrollDelta) window.scrollBy(0, scrollDelta);
      refreshDragTarget(session);
      session.animationFrame = window.requestAnimationFrame(tick);
    };
    session.animationFrame = window.requestAnimationFrame(tick);
  };

  const activateDrag = (session: DragSession) => {
    if (dragSessionRef.current !== session || session.active) return;
    session.active = true;
    setDraggingAppId(session.appId);
    refreshDragTarget(session);
    beginAutoScroll(session);
  };

  const handleDragPointerDown = (appId: string, event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragEnabled || event.pointerType === 'touch' || event.button !== 0) return;
    event.preventDefault();
    dragSessionRef.current?.cleanup();
    const session: DragSession = {
      appId, mode: 'mouse', pointerId: event.pointerId,
      startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY,
      active: false, cleanup: () => {},
    };
    const cleanup = (clearUi = true) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      window.removeEventListener('blur', onCancel);
      if (session.animationFrame !== undefined) window.cancelAnimationFrame(session.animationFrame);
      if (dragSessionRef.current === session) dragSessionRef.current = null;
      if (clearUi) { setDraggingAppId(null); setDragTarget(null); }
    };
    session.cleanup = cleanup;
    dragSessionRef.current = session;
    const onMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== session.pointerId) return;
      session.x = moveEvent.clientX;
      session.y = moveEvent.clientY;
      if (!session.active && Math.hypot(session.x - session.startX, session.y - session.startY) >= 8) activateDrag(session);
      if (session.active) { refreshDragTarget(session); beginAutoScroll(session); }
    };
    const onUp = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== session.pointerId) return;
      session.x = upEvent.clientX;
      session.y = upEvent.clientY;
      if (session.active) commitDragAt(session);
      cleanup();
    };
    const onCancel = () => cleanup();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    window.addEventListener('blur', onCancel);
  };

  const handleDragTouchStart = (appId: string, event: React.TouchEvent<HTMLButtonElement>) => {
    if (!dragEnabled || event.touches.length !== 1) return;
    dragSessionRef.current?.cleanup();
    const touch = event.touches[0];
    const session: DragSession = {
      appId, mode: 'touch', touchId: touch.identifier,
      startX: touch.clientX, startY: touch.clientY, x: touch.clientX, y: touch.clientY,
      active: false, cleanup: () => {},
    };
    const findTouch = (touches: TouchList) => Array.from(touches).find((item) => item.identifier === session.touchId);
    const cleanup = (clearUi = true) => {
      if (session.timer !== undefined) window.clearTimeout(session.timer);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onCancel);
      window.removeEventListener('blur', onCancel);
      if (session.animationFrame !== undefined) window.cancelAnimationFrame(session.animationFrame);
      if (dragSessionRef.current === session) dragSessionRef.current = null;
      if (clearUi) { setDraggingAppId(null); setDragTarget(null); }
    };
    session.cleanup = cleanup;
    dragSessionRef.current = session;
    const onMove = (moveEvent: TouchEvent) => {
      const current = findTouch(moveEvent.touches);
      if (!current) return;
      session.x = current.clientX;
      session.y = current.clientY;
      if (!session.active && Math.hypot(session.x - session.startX, session.y - session.startY) >= 10) {
        cleanup();
        return;
      }
      if (session.active) {
        moveEvent.preventDefault();
        refreshDragTarget(session);
        beginAutoScroll(session);
      }
    };
    const onEnd = (endEvent: TouchEvent) => {
      const ended = findTouch(endEvent.changedTouches);
      if (!ended) return;
      session.x = ended.clientX;
      session.y = ended.clientY;
      if (session.active) commitDragAt(session);
      cleanup();
    };
    const onCancel = () => cleanup();
    session.timer = window.setTimeout(() => activateDrag(session), 420);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onCancel);
    window.addEventListener('blur', onCancel);
  };

  const saveSection = (section: Section) => {
    setData((current) => {
      const exists = current.sections.some((item) => item.id === section.id);
      return { ...current, sections: normalizeSectionOrders(exists ? current.sections.map((item) => item.id === section.id ? section : item) : [...current.sections, section]) };
    });
    setModal(null);
    setToast(section.id.startsWith('section-') ? 'Section added' : 'Section updated');
  };

  const deleteSection = (sectionId: string) => {
    const section = data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    setData((current) => ({ sections: normalizeSectionOrders(current.sections.filter((item) => item.id !== sectionId)), apps: normalizeAppOrders(current.apps.filter((app) => app.sectionId !== sectionId)) }));
    setModal(null);
    setConfirmSectionId(null);
    setToast(`${section.title} and its links removed`);
  };

  const downloadRecoveryBundle = () => {
    const bundle = JSON.stringify({
      exportedAt: new Date().toISOString(),
      originalStoragePayload: recoveryRaw,
      workingDashboard: data,
    }, null, 2);
    const url = URL.createObjectURL(new Blob([bundle], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'applink-recovery-bundle.json';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const replaceUnreadableCache = () => {
    setData(freshStore());
    setPersistenceBlocked(false);
    setStorageNotice(null);
    setStorageError(null);
    setModal(null);
    setToast('Starter dashboard restored');
  };

  const restoreSeedLayout = () => {
    setData(freshStore());
    setStorageNotice(null);
    setModal(null);
    setToast('Seed layout restored');
  };

  const notesApp = data.apps.find((app) => app.id === notesAppId) ?? null;
  const tagsSection = data.sections.find((section) => section.id === tagsSectionId);

  return (
    <div className="app-shell" data-testid="app-shell">
      <header className="topbar">
        <div className="brand" data-testid="brand-applink"><span className="brand-mark">A/</span><span className="brand-name">AppLink</span></div>
        <div className="top-actions">
          <span className={`offline-pill ${online ? '' : 'offline'}`} data-testid="status-offline">
            {online ? <Wifi size={13} /> : <WifiOff size={13} />}
            <span>{online ? 'Local-first' : 'Offline mode'}</span>
          </span>
          <button className="quiet-button" onClick={() => setEditMode(!editMode)} data-testid="button-toggle-edit-mode" aria-pressed={editMode}>
            <Settings2 size={15} /><span>{editMode ? 'Done editing' : 'Edit dashboard'}</span>
          </button>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div>
            <div className="eyebrow"><i className="eyebrow-dot" /> Your launchpad</div>
            <h1>Open the things<br />that move you <em>forward.</em></h1>
          </div>
          <p className="hero-copy">A small, considered home for the places you return to every day. No feeds. No noise. Just your next useful click.</p>
        </section>

        <div className="toolbar">
          <div className="search-wrap">
            <Search size={17} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="search-input" placeholder="Search apps, links, notes…" aria-label="Search your launchpad" data-testid="input-search-apps" />
            {search && <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search" data-testid="button-clear-search"><X size={15} /></button>}
          </div>
          <button className={`toolbar-button ${activeFilterCount ? 'active' : ''}`} onClick={() => setModal('filters')} data-testid="button-open-filters"><SlidersHorizontal size={15} /> Filters {activeFilterCount > 0 && <span className="count">{activeFilterCount}</span>}</button>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} className="sort-select" aria-label="Sort app links" data-testid="select-sort-apps">
            <option value="custom">Manual order</option><option value="priority">Priority</option><option value="alpha">A → Z</option><option value="recent">Recently opened</option><option value="used">Most used</option><option value="added">Recently added</option>
          </select>
          <button className="toolbar-button" onClick={() => { setEditingApp(null); setModal('app'); }} data-testid="button-add-app"><Plus size={16} /> Add app</button>
        </div>

        {(activeFilterCount > 0 || search) && <div className="active-filters" aria-label="Active filters">
          {search && <button className="active-chip" onClick={() => setSearch('')}><Search size={12} /> “{search}” <X size={12} /></button>}
          {filters.sectionId !== 'all' && <button className="active-chip" onClick={() => setFilters((current) => ({ ...current, sectionId: 'all' }))}>{data.sections.find((section) => section.id === filters.sectionId)?.title ?? 'Section'} <X size={12} /></button>}
          {filters.tag !== 'all' && <button className="active-chip" onClick={() => setFilters((current) => ({ ...current, tag: 'all' }))}>#{filters.tag} <X size={12} /></button>}
          {filters.priority !== 'all' && <button className="active-chip" onClick={() => setFilters((current) => ({ ...current, priority: 'all' }))}>{priorityLabels[filters.priority as Priority]} <X size={12} /></button>}
          {filters.favorites && <button className="active-chip" onClick={() => setFilters((current) => ({ ...current, favorites: false }))}><Star size={12} fill="currentColor" /> Favorites <X size={12} /></button>}
          <button className="clear-active" onClick={() => { setFilters({ sectionId: 'all', tag: 'all', priority: 'all', favorites: false }); setSearch(''); }} data-testid="button-clear-active-filters">Clear all</button>
        </div>}

          {editMode && <div className="edit-controls" data-testid="edit-mode-banner"><GripVertical size={17} color="var(--coral)" /><p><strong>Dashboard edit mode.</strong> Reorder sections and links, or use each card menu to change its home. {dragEnabled ? 'Mouse: drag the handle. Touch: hold the handle briefly, then drag; moving before activation scrolls normally. Arrow buttons are also available.' : 'Drag is paused while search, filters, or a non-manual sort is active.'}</p><span className="drag-hint">LOCAL CHANGES</span><button className="secondary-button" style={{ height: 32, padding: '0 9px' }} onClick={() => { setEditingSection(null); setModal('section'); }} data-testid="button-add-section"><FolderPlus size={13} /> Add section</button><button className="icon-button" onClick={() => setModal(persistenceBlocked ? 'storage-recovery' : 'restore-confirm')} aria-label="Restore seed layout" data-testid="button-restore-layout"><RotateCcw size={15} /></button></div>}

        {sortedSections.map((section, sectionIndex) => {
          const sectionApps = filteredApps.filter((app) => app.sectionId === section.id).sort((a, b) => {
            if (sortMode === 'alpha') return a.name.localeCompare(b.name);
            if (sortMode === 'priority') return priorityValue(b.priority) - priorityValue(a.priority) || a.sortOrder - b.sortOrder;
            if (sortMode === 'recent') return (b.lastOpenedAt ? new Date(b.lastOpenedAt).getTime() : 0) - (a.lastOpenedAt ? new Date(a.lastOpenedAt).getTime() : 0);
            if (sortMode === 'used') return b.launchCount - a.launchCount || a.sortOrder - b.sortOrder;
            if (sortMode === 'added') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return a.sortOrder - b.sortOrder;
          });
          if (filters.sectionId !== 'all' && filters.sectionId !== section.id) return null;
          if (!sectionApps.length && (search || activeFilterCount) && !editMode) return null;
          const revealMatching = Boolean(search.trim() && sectionApps.length);
          const isCollapsed = section.collapsed && !revealMatching;
          return (
            <section className={`section-block drop-target-section ${dragTarget?.sectionId === section.id ? 'drag-over' : ''}`} key={section.id} data-section-id={section.id} data-testid={`section-${section.id}`}>
              <div className="section-heading">
                <div className="section-label">
                  {editMode && <span className="section-kicker">{String(sectionIndex + 1).padStart(2, '0')}</span>}
            <button className="section-title-button" onClick={() => toggleSection(section.id)} aria-expanded={!isCollapsed} data-testid={`button-toggle-section-${section.id}`}>
                    <h2 className="section-title">{section.title}</h2><ChevronDown className={`section-chevron ${isCollapsed ? 'collapsed' : ''}`} size={18} />
                  </button>
                  <span className="section-kicker">{sectionApps.length} {sectionApps.length === 1 ? 'link' : 'links'}</span>
                  <PriorityBadge priority={section.priority} />
                  <div className="section-tags">{section.tags.slice(0, 2).map((tag) => <span key={tag}>#{tag}</span>)}</div>
                  <div className="section-rule" />
                </div>
                <div className="section-tools">
                  {editMode && <><button className="icon-button" onClick={() => moveSection(section, -1)} aria-label={`Move ${section.title} up`} data-testid={`button-move-section-up-${section.id}`}><ArrowUp size={14} /></button><button className="icon-button" onClick={() => moveSection(section, 1)} aria-label={`Move ${section.title} down`} data-testid={`button-move-section-down-${section.id}`}><ArrowDown size={14} /></button></>}
                  <SectionMenu section={section} editMode={editMode} onEdit={() => { setEditingSection(section); setModal('section'); }} onDelete={() => { setConfirmSectionId(section.id); setModal('confirm'); }} onShowAllTags={() => { setTagsSectionId(section.id); setModal('section-tags'); }} />
                </div>
              </div>
              {revealMatching && section.collapsed && <div className="search-reveal-note">Matching links shown · saved collapsed state unchanged</div>}
              <div className={`section-content ${isCollapsed ? 'collapsed' : ''}`} aria-hidden={isCollapsed}>
                <div className="section-content-inner">
                  <div className="cards-grid">
                    {sectionApps.map((app) => <AppCard key={app.id} app={app} editMode={editMode} dragEnabled={dragEnabled} dragging={draggingAppId === app.id} isDropTarget={dragTarget?.appId === app.id} onDragPointerDown={(event) => handleDragPointerDown(app.id, event)} onDragTouchStart={(event) => handleDragTouchStart(app.id, event)} onLaunch={() => launchApp(app)} onFavorite={() => toggleFavorite(app)} onEdit={() => { setEditingApp(app); setModal('app'); }} onNotes={() => { setNotesAppId(app.id); setModal('notes'); }} onMove={(direction) => moveApp(app, direction, sectionApps.map((item) => item.id))} onDuplicate={() => duplicateApp(app)} onMoveTo={() => { setMovingApp(app); setModal('move'); }} onDelete={() => { setDeletingApp(app); setModal('app-confirm'); }} />)}
                    {!sectionApps.length && editMode && <div className="section-drop-empty">Drop a link here · or add one</div>}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {!filteredApps.length && <div className="empty-state" data-testid="empty-search-state"><Sparkles size={23} color="var(--coral)" /><strong>{search || activeFilterCount ? 'Nothing matches that view.' : 'Your launchpad is clear.'}</strong><p>{search || activeFilterCount ? 'Try a different search or loosen a filter.' : data.sections.length ? 'Add the first place you want to return to.' : 'Create a section before adding your first link.'}</p>{data.sections.length ? <button className="primary-button" onClick={() => { setEditingApp(null); setModal('app'); }} data-testid="button-empty-add-app"><Plus size={15} /> Add an app</button> : <button className="primary-button" onClick={() => { setEditingSection(null); setModal('section'); }}><FolderPlus size={15} /> Create section</button>}</div>}

        {(storageNotice || storageError) && <div className="storage-warning" role={persistenceBlocked || storageError ? 'alert' : 'status'}>
          {storageNotice && <p>{storageNotice}</p>}
          {storageError && <p>{storageError}</p>}
          {persistenceBlocked && <><p>Your edits in this temporary view are not being saved. Download a recovery bundle or explicitly replace the unreadable cache to resume saving.</p><button className="secondary-button" onClick={() => setModal('storage-recovery')} data-testid="button-open-storage-recovery">Review recovery options</button></>}
        </div>}
        <div className="footer-line"><span><strong>{data.apps.length}</strong> links · <strong>{data.sections.length}</strong> spaces · {persistenceBlocked || storageError ? 'not saved' : 'saved on this device'}</span><span className={`offline-pill ${online ? '' : 'offline'}`}><i /> {online ? 'ready when you are' : 'working offline'}</span></div>
      </main>

      <button className="floating-add" onClick={() => { setEditingApp(null); setModal('app'); }} aria-label="Add app link" data-testid="button-floating-add"><Plus size={22} /></button>
      {modal === 'app' && <AppSheet app={editingApp} sections={data.sections} onClose={() => setModal(null)} onSave={saveApp} onDelete={(id) => { const target = data.apps.find((item) => item.id === id); if (target) { setDeletingApp(target); setModal('app-confirm'); } }} onAddSection={() => { setEditingSection(null); setModal('section'); }} />}
      {modal === 'section' && <SectionSheet section={editingSection} nextOrder={data.sections.length} onClose={() => setModal(null)} onSave={saveSection} />}
      {modal === 'filters' && <FilterSheet filters={filters} sections={data.sections} tags={allTags} onClose={() => setModal(null)} onApply={(next) => { setFilters(next); setModal(null); }} />}
      {modal === 'section-tags' && tagsSection && <Modal onClose={() => setModal(null)} label={`${tagsSection.title} hashtags`}>
        <div className="sheet-header"><div><h2 className="sheet-title">{tagsSection.title} hashtags</h2><p className="sheet-subtitle">All {tagsSection.tags.length} tags in this section.</p></div></div>
        <div className="section-tags-drawer" data-testid={`drawer-section-tags-${tagsSection.id}`}><SectionTagsList tags={tagsSection.tags} /></div>
      </Modal>}
      {modal === 'notes' && notesApp && <NotesSheet app={notesApp} onClose={() => setModal(null)} onUpdate={(notes) => updateApp(notesApp.id, { notes })} />}
      {modal === 'confirm' && confirmSectionId && <ConfirmSheet section={data.sections.find((item) => item.id === confirmSectionId)} onClose={() => setModal(null)} onConfirm={() => deleteSection(confirmSectionId)} />}
      {modal === 'move' && movingApp && <MoveSheet app={movingApp} sections={data.sections} onClose={() => setModal(null)} onMove={(sectionId) => moveAppToSection(movingApp, sectionId)} />}
      {modal === 'app-confirm' && deletingApp && <AppConfirmSheet app={deletingApp} onClose={() => setModal(null)} onConfirm={() => deleteApp(deletingApp.id)} />}
       {modal === 'storage-recovery' && <RecoverySheet hasOriginal={recoveryRaw !== null} onClose={() => setModal(null)} onDownload={downloadRecoveryBundle} onReplace={replaceUnreadableCache} />}
       {modal === 'restore-confirm' && <RestoreSeedSheet onClose={() => setModal(null)} onConfirm={restoreSeedLayout} />}
      {toast && <div className="toast" role="status" data-testid="status-toast"><Check size={14} /> {toast}</div>}
    </div>
  );
}

function existsApp(apps: AppLink[], id: string) {
  return apps.some((app) => app.id === id);
}

function priorityValue(priority: AppLink['priority'] | Section['priority']) {
  return priority === 'p1' ? 4 : priority === 'p2' ? 3 : priority === 'p3' ? 2 : priority === 'p4' ? 1 : 0;
}

function AppCard({ app, editMode, dragEnabled, dragging, isDropTarget, onDragPointerDown, onDragTouchStart, onLaunch, onFavorite, onEdit, onNotes, onMove, onDuplicate, onMoveTo, onDelete }: { app: AppLink; editMode: boolean; dragEnabled: boolean; dragging: boolean; isDropTarget: boolean; onDragPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void; onDragTouchStart: (event: React.TouchEvent<HTMLButtonElement>) => void; onLaunch: () => void; onFavorite: () => void; onEdit: () => void; onNotes: () => void; onMove: (direction: -1 | 1) => void; onDuplicate: () => void; onMoveTo: () => void; onDelete: () => void }) {
  return (
    <article className={`app-card ${editMode ? 'editing' : ''} ${dragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target-card' : ''}`} data-app-id={app.id} data-testid={`card-app-${app.id}`}>
      {app.imageUrl && <img className="card-image" src={app.imageUrl} alt="" loading="lazy" decoding="async" />}
      <div className="card-overlay" style={{ background: app.overlayColor, opacity: app.overlayOpacity }} />
      <div className="card-shade" />
      <div className="card-content">
        <div className="card-top">
          <div className="app-icon" aria-label={`${app.name} icon`}>{app.icon || getInitials(app.name)}</div>
          <div className="card-top-actions">
            <CardMenu app={app} onEdit={onEdit} onMove={onMoveTo} onDuplicate={onDuplicate} onDelete={onDelete} />
            <button className={`favorite-button ${app.favorite ? 'active' : ''}`} onClick={onFavorite} aria-label={app.favorite ? `Remove ${app.name} from favorites` : `Favorite ${app.name}`} data-testid={`button-favorite-${app.id}`}><Star size={15} fill={app.favorite ? 'currentColor' : 'none'} /></button>
          </div>
        </div>
        {editMode && <div className="card-edit-bar">
          <button type="button" className={`drag-handle ${dragEnabled ? '' : 'disabled'}`} onPointerDown={onDragPointerDown} onTouchStart={onDragTouchStart} aria-label={dragEnabled ? `Reorder ${app.name}; hold the handle for 0.42 seconds on touch` : 'Drag disabled while sorted or filtered'} aria-disabled={!dragEnabled} title={dragEnabled ? 'Mouse drag, or hold for 0.42 seconds on touch; arrows are the keyboard fallback' : 'Return to Manual order and clear search/filters to drag'}><GripVertical size={13} /> Drag</button>
          <button type="button" onClick={() => onMove(-1)} aria-label={`Move ${app.name} earlier`} data-testid={`button-move-app-up-${app.id}`}><ArrowUp size={12} /></button>
          <button type="button" onClick={() => onMove(1)} aria-label={`Move ${app.name} later`} data-testid={`button-move-app-down-${app.id}`}><ArrowDown size={12} /></button>
        </div>}
        <div className="card-bottom">
          <div className="card-copy"><h3 className="card-name">{app.name}</h3><p className="card-description">{app.description}</p></div>
          <PriorityBadge priority={app.priority} />
        </div>
        <div className="card-meta">
          <div className="card-tags">{app.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          <div className="card-actions"><div className="card-status"><span>{app.launchCount} opens</span><span>{app.lastOpenedAt ? `Last ${formatDate(app.lastOpenedAt)}` : 'Not opened yet'}</span></div><button className="notes-button" onClick={onNotes} aria-label={`View ${app.notes.length} notes for ${app.name}`} data-testid={editMode ? `button-notes-app-${app.id}` : `button-open-notes-${app.id}`}><StickyNote size={13} /><span>{app.notes.length}</span></button><button className="launch-button" onClick={onLaunch} aria-label={`Open ${app.name}`} data-testid={`button-launch-${app.id}`}>OPEN <ArrowUpRight size={15} /></button></div>
        </div>
      </div>
    </article>
  );
}

function CardMenu({ app, onEdit, onMove, onDuplicate, onDelete }: { app: AppLink; onEdit: () => void; onMove: () => void; onDuplicate: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 12, right: 12 });
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const menuHeight = 172;
      const menuWidth = Math.min(205, window.innerWidth - 16);
      let top = rect.bottom + 6;
      if (top + menuHeight > window.innerHeight - 8) top = Math.max(8, rect.top - menuHeight - 6);
      const right = Math.min(
        Math.max(8, window.innerWidth - rect.right),
        Math.max(8, window.innerWidth - menuWidth - 8),
      );
      setPosition({ top, right });
    };
    updatePosition();
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!root.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);
  const act = (callback: () => void) => { setOpen(false); callback(); };
  return <>
    <div className="section-menu card-menu" ref={root}>
      <button ref={trigger} className="icon-button card-menu-trigger" onClick={() => setOpen((value) => !value)} aria-label={`Actions for ${app.name}`} aria-expanded={open} aria-haspopup="menu" data-testid={`button-card-menu-${app.id}`}><MoreHorizontal size={16} /></button>
    </div>
    {open && createPortal(<div ref={menu} className="popover card-menu-popover" style={{ position: 'fixed', top: position.top, right: position.right, zIndex: 30 }} role="menu" data-testid={`menu-card-${app.id}`}>
      <button role="menuitem" onClick={() => act(onEdit)} data-testid={`button-edit-app-${app.id}`}><Pencil size={14} /> Edit</button>
      <button role="menuitem" onClick={() => act(onMove)} data-testid={`button-move-app-${app.id}`}><MoveRight size={14} /> Move to section</button>
      <button role="menuitem" onClick={() => act(onDuplicate)} data-testid={`button-duplicate-app-${app.id}`}><Copy size={14} /> Duplicate</button>
      <button role="menuitem" className="danger-menu-item" onClick={() => act(onDelete)} data-testid={`button-delete-app-${app.id}`}><Trash2 size={14} /> Delete</button>
    </div>, document.body)}
  </>;
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`priority-badge priority-${priority}`} aria-label={priorityLabels[priority]} title={priorityLabels[priority]}>{priority === 'none' ? '—' : priority.toUpperCase()}</span>;
}

function Modal({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  const dialog = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const focusable = () => Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.stopPropagation(); closeRef.current(); return; }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.current?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.current?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus(); };
  }, []);
  return <div className="backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialog} className="sheet" role="dialog" aria-modal="true" aria-label={label}><div className="sheet-inner"><div className="sheet-handle" /><button className="icon-button sheet-close" style={{ position: 'absolute', right: 18, top: 13 }} onClick={onClose} aria-label="Close dialog" data-testid="button-close-dialog"><X size={18} /></button>{children}</div></section></div>;
}

function AppSheet({ app, sections, onClose, onSave, onDelete, onAddSection }: { app: AppLink | null; sections: Section[]; onClose: () => void; onSave: (app: AppLink) => void; onDelete: (id: string) => void; onAddSection: () => void }) {
  const [draft, setDraft] = useState<AppLink>(() => app ?? { id: makeId('app'), sectionId: sections[0]?.id ?? '', name: '', description: '', url: 'https://', imageUrl: asset('town-grid.png'), icon: '', overlayColor: '#375bd2', overlayOpacity: .3, tags: [], priority: 'p3', favorite: false, sortOrder: 0, createdAt: new Date().toISOString(), launchCount: 0, lastOpenedAt: null, notes: [] });
  const [tagText, setTagText] = useState(draft.tags.join(', '));
  const [urlError, setUrlError] = useState('');
  const set = <K extends keyof AppLink>(key: K, value: AppLink[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!sections.length) { setUrlError('Create a section before adding an app link.'); return; }
    const url = draft.url.trim();
    if (!isSafeHttpUrl(url)) { setUrlError('Enter a valid http:// or https:// URL. Other URL schemes are not allowed.'); return; }
    setUrlError('');
    onSave({ ...draft, url, name: draft.name.trim() || 'Untitled link', tags: tagText.split(',').map((tag) => tag.trim().replace(/^#/, '')).filter(Boolean), sortOrder: app?.sortOrder ?? 999 });
  };
  return <Modal onClose={onClose} label={app ? 'Edit app link' : 'Add app link'}>
    <div className="sheet-header"><div><h2 className="sheet-title">{app ? 'Refine this link' : 'Add a new link'}</h2><p className="sheet-subtitle">Make the next click feel obvious.</p></div><Layers size={22} color="var(--coral)" /></div>
    <form onSubmit={submit} className="form-grid">
      <div className="preview" style={{ backgroundColor: '#27455c' }}>{draft.imageUrl && <img className="preview-image" src={draft.imageUrl} alt="" decoding="async" /> }<div className="preview-tint" style={{ background: draft.overlayColor, opacity: draft.overlayOpacity }} /><div className="preview-shade" /><div className="preview-content"><div className="preview-top"><span className="app-icon">{draft.icon || getInitials(draft.name || 'A')}</span>{draft.favorite && <Star className="preview-favorite" size={16} fill="currentColor" />}</div><div className="preview-main"><div className="preview-card-copy"><h3 className="preview-name">{draft.name || 'Your new app'}</h3><p className="preview-description">{draft.description || 'A short reason to open it.'}</p></div><PriorityBadge priority={draft.priority} /></div><div className="preview-tags">{tagText.split(',').map((tag) => tag.trim().replace(/^#/, '')).filter(Boolean).map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="preview-url">{draft.url || 'https://your-link.com'}</div></div></div>
      <div className="form-row"><div className="field"><label htmlFor="app-name">Name</label><input id="app-name" value={draft.name} onChange={(event) => set('name', event.target.value)} placeholder="e.g. Readwise" data-testid="input-app-name" required /></div><div className="field"><label htmlFor="app-icon">Icon text</label><input id="app-icon" value={draft.icon} maxLength={6} onChange={(event) => set('icon', event.target.value)} placeholder="RW" data-testid="input-app-icon" /><p className="form-hint">Letters, emoji, or a short label.</p></div></div>
      <div className="field"><label htmlFor="app-url">URL</label><input id="app-url" type="text" inputMode="url" value={draft.url} onChange={(event) => { set('url', event.target.value); setUrlError(''); }} placeholder="https://…" aria-invalid={Boolean(urlError)} aria-describedby={urlError ? 'app-url-error' : undefined} data-testid="input-app-url" required />{urlError && <p className="form-error" id="app-url-error">{urlError}</p>}</div>
      <div className="field"><label htmlFor="app-description">Description</label><textarea id="app-description" value={draft.description} onChange={(event) => set('description', event.target.value)} placeholder="A short reason to open it." data-testid="input-app-description" /></div>
      <div className="form-row"><div className="field"><label htmlFor="app-section">Section</label>{sections.length ? <select id="app-section" value={draft.sectionId} onChange={(event) => set('sectionId', event.target.value)} data-testid="select-app-section">{sections.map((section) => <option key={section.id} value={section.id}>{section.title}</option>)}</select> : <div className="empty-section-prompt"><span>Create a section before adding this link.</span><button type="button" className="secondary-button" onClick={onAddSection}><FolderPlus size={14} /> Create section</button></div>}</div><div className="field"><label htmlFor="app-priority">Priority</label><select id="app-priority" value={draft.priority} onChange={(event) => set('priority', event.target.value as Priority)} data-testid="select-app-priority">{(Object.keys(priorityLabels) as Priority[]).map((priority) => <option key={priority} value={priority}>{priorityLabels[priority]}</option>)}</select></div></div>
      <div className="field"><label htmlFor="app-tags">Tags</label><input id="app-tags" value={tagText} onChange={(event) => setTagText(event.target.value)} placeholder="design, research, daily" data-testid="input-app-tags" /><p className="form-hint">Separate tags with commas. They power search and filters.</p></div>
      <div className="field"><label htmlFor="app-image">Background image URL</label><input id="app-image" value={draft.imageUrl} onChange={(event) => set('imageUrl', event.target.value)} placeholder="https://…" data-testid="input-app-image" /><p className="form-hint">Use a web image URL or a local image path.</p></div>
      <div className="form-row"><div className="field"><label htmlFor="app-overlay-color">Overlay color or CSS gradient</label><input id="app-overlay-color" value={draft.overlayColor} onChange={(event) => set('overlayColor', event.target.value)} placeholder="#375bd2 or linear-gradient(…)" data-testid="input-app-overlay-color" /><div className="swatches">{['#375bd2', '#ef6e55', '#8db72e', '#152427', '#b77b43', 'linear-gradient(135deg, #375bd2, #ef6e55)'].map((color) => <button type="button" key={color} className={`swatch ${draft.overlayColor === color ? 'active' : ''}`} style={{ background: color }} onClick={() => set('overlayColor', color)} aria-label={`Use overlay ${color}`} data-testid={color.startsWith('#') ? `button-color-${color.slice(1)}` : 'button-color-gradient'} />)}</div></div><div className="field"><label htmlFor="app-overlay-opacity">Overlay opacity · {Math.round(draft.overlayOpacity * 100)}%</label><input id="app-overlay-opacity" type="range" min="0" max="1" step="0.05" value={draft.overlayOpacity} onChange={(event) => set('overlayOpacity', Number(event.target.value))} data-testid="input-app-overlay-opacity" /></div></div>
      <button type="button" className={`favorite-toggle ${draft.favorite ? 'active' : ''}`} onClick={() => set('favorite', !draft.favorite)} aria-pressed={draft.favorite} data-testid="button-toggle-app-favorite"><Star size={15} fill={draft.favorite ? 'currentColor' : 'none'} /> {draft.favorite ? 'Saved to favorites' : 'Add to favorites'}</button>
      <div className="sheet-actions"><button type="button" className="secondary-button" onClick={onClose} data-testid="button-cancel-app">Cancel</button>{app && <button type="button" className="danger-button" onClick={() => onDelete(app.id)} data-testid="button-delete-app"><Trash2 size={14} /> Delete</button>}<button type="submit" className="primary-button" data-testid="button-save-app"><Check size={14} /> {app ? 'Save changes' : 'Add to launchpad'}</button></div>
    </form>
  </Modal>;
}

function SectionSheet({ section, nextOrder, onClose, onSave }: { section: Section | null; nextOrder: number; onClose: () => void; onSave: (section: Section) => void }) {
  const [title, setTitle] = useState(section?.title ?? '');
  const [tags, setTags] = useState(section?.tags.join(', ') ?? '');
  const [priority, setPriority] = useState<Section['priority']>(section?.priority ?? 'p3');
  return <Modal onClose={onClose} label={section ? 'Edit section' : 'Add section'}>
    <div className="sheet-header"><div><h2 className="sheet-title">{section ? 'Tune this space' : 'Make a new space'}</h2><p className="sheet-subtitle">Sections keep your attention in the right neighborhood.</p></div><FolderPlus size={22} color="var(--coral)" /></div>
    <form className="form-grid" onSubmit={(event) => { event.preventDefault(); onSave({ id: section?.id ?? makeId('section'), title: title.trim() || 'New section', tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean), priority, sortOrder: section?.sortOrder ?? nextOrder, collapsed: section?.collapsed ?? false }); }}>
      <div className="field"><label htmlFor="section-title">Section name</label><input id="section-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. READING ROOM" required data-testid="input-section-title" /></div>
      <div className="field"><label htmlFor="section-tags">Section tags</label><input id="section-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="focus, weekend" data-testid="input-section-tags" /></div>
      <div className="field"><label htmlFor="section-priority">Section priority</label><select id="section-priority" value={priority} onChange={(event) => setPriority(event.target.value as Priority)} data-testid="select-section-priority">{(Object.keys(priorityLabels) as Priority[]).map((value) => <option key={value} value={value}>{priorityLabels[value]}</option>)}</select></div>
      <div className="sheet-actions"><button type="button" className="secondary-button" onClick={onClose} data-testid="button-cancel-section">Cancel</button><button type="submit" className="primary-button" data-testid="button-save-section"><Check size={14} /> {section ? 'Save section' : 'Add section'}</button></div>
    </form>
  </Modal>;
}

function FilterSheet({ filters, sections, tags, onClose, onApply }: { filters: FilterState; sections: Section[]; tags: string[]; onClose: () => void; onApply: (filters: FilterState) => void }) {
  const [draft, setDraft] = useState(filters);
  const toggleFavorites = () => setDraft((current) => ({ ...current, favorites: !current.favorites }));
  return <Modal onClose={onClose} label="Filter launchpad">
    <div className="sheet-header"><div><h2 className="sheet-title">Shape the view</h2><p className="sheet-subtitle">Keep only what you need right now.</p></div><SlidersHorizontal size={22} color="var(--coral)" /></div>
    <div className="filter-options">
      <div><p className="option-title">Section</p><div className="chip-list"><button className={`chip ${draft.sectionId === 'all' ? 'active' : ''}`} onClick={() => setDraft({ ...draft, sectionId: 'all' })} data-testid="chip-section-all">All sections</button>{sections.map((section) => <button key={section.id} className={`chip ${draft.sectionId === section.id ? 'active' : ''}`} onClick={() => setDraft({ ...draft, sectionId: section.id })} data-testid={`chip-section-${section.id}`}>{section.title}</button>)}</div></div>
      <div><p className="option-title">Tags</p><div className="chip-list"><button className={`chip ${draft.tag === 'all' ? 'active' : ''}`} onClick={() => setDraft({ ...draft, tag: 'all' })} data-testid="chip-tag-all">All tags</button>{tags.map((tag) => <button key={tag} className={`chip ${draft.tag === tag ? 'active' : ''}`} onClick={() => setDraft({ ...draft, tag })} data-testid={`chip-tag-${tag}`}>#{tag}</button>)}</div></div>
      <div><p className="option-title">Priority</p><div className="chip-list">{['all', ...(Object.keys(priorityLabels) as Priority[])].map((priority) => <button key={priority} className={`chip ${draft.priority === priority ? 'active' : ''}`} onClick={() => setDraft({ ...draft, priority })} data-testid={`chip-priority-${priority}`}>{priority === 'all' ? 'Any priority' : priorityLabels[priority as Priority]}</button>)}</div></div>
      <div><p className="option-title">Show</p><button className={`chip ${draft.favorites ? 'active' : ''}`} onClick={toggleFavorites} data-testid="chip-favorites"><Star size={13} fill={draft.favorites ? 'currentColor' : 'none'} /> Favorites only</button></div>
    </div>
    <div className="sheet-actions"><button className="secondary-button" onClick={() => onApply({ sectionId: 'all', tag: 'all', priority: 'all', favorites: false })} data-testid="button-clear-filters">Clear all</button><button className="primary-button" onClick={() => onApply(draft)} data-testid="button-apply-filters"><Check size={14} /> Apply filters</button></div>
  </Modal>;
}

function NotesSheet({ app, onClose, onUpdate }: { app: AppLink; onClose: () => void; onUpdate: (notes: Note[]) => void }) {
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingNote = app.notes.find((note) => note.id === editingId);
  const submit = () => {
    if (!text.trim()) return;
    const now = new Date().toISOString();
    if (editingId) onUpdate(app.notes.map((note) => note.id === editingId ? { ...note, text: text.trim(), updatedAt: now } : note));
    else onUpdate([{ id: makeId('note'), text: text.trim(), pinned: false, createdAt: now, updatedAt: now }, ...app.notes]);
    setText(''); setEditingId(null);
  };
  return <Modal onClose={onClose} label={`Notes for ${app.name}`}>
    <div className="sheet-header"><div><h2 className="sheet-title">Notes for {app.name}</h2><p className="sheet-subtitle">Keep the context close to the click.</p></div><StickyNote size={22} color="var(--coral)" /></div>
    <div className="notes-list">{app.notes.length ? [...app.notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map((note) => <div className={`note-row ${note.pinned ? 'pinned' : ''}`} key={note.id} data-testid={`note-${note.id}`}><div className="note-text">{note.text}<div className="note-meta">{note.pinned ? 'Pinned · ' : ''}Created {formatDate(note.createdAt)} · Updated {formatDate(note.updatedAt)}</div></div><div className="note-actions"><button onClick={() => onUpdate(app.notes.map((item) => item.id === note.id ? { ...item, pinned: !item.pinned, updatedAt: new Date().toISOString() } : item))} aria-label={note.pinned ? 'Unpin note' : 'Pin note'} data-testid={`button-pin-note-${note.id}`}>{note.pinned ? <PinOff size={14} /> : <Pin size={14} />}</button><button onClick={() => { setEditingId(note.id); setText(note.text); }} aria-label="Edit note" data-testid={`button-edit-note-${note.id}`}><Edit3 size={14} /></button><button onClick={() => onUpdate(app.notes.filter((item) => item.id !== note.id))} aria-label="Delete note" data-testid={`button-delete-note-${note.id}`}><Trash2 size={14} /></button></div></div>) : <div className="empty-state"><StickyNote size={20} /><strong>No notes yet.</strong><p>Save a tiny reminder, prompt, or next step.</p></div>}</div>
    <div className="field"><label htmlFor="note-text">{editingNote ? 'Edit note' : 'New note'}</label><textarea id="note-text" value={text} onChange={(event) => setText(event.target.value)} placeholder="What should you remember when you open this?" data-testid="input-note-text" /></div>
    <div className="sheet-actions">{editingNote && <button className="secondary-button" onClick={() => { setEditingId(null); setText(''); }} data-testid="button-cancel-note-edit">Cancel edit</button>}<button className="primary-button" onClick={submit} disabled={!text.trim()} data-testid="button-save-note"><Plus size={14} /> {editingNote ? 'Update note' : 'Add note'}</button></div>
  </Modal>;
}

function MoveSheet({ app, sections, onClose, onMove }: { app: AppLink; sections: Section[]; onClose: () => void; onMove: (sectionId: string) => void }) {
  return <Modal onClose={onClose} label={`Move ${app.name} to a section`}>
    <div className="sheet-header"><div><h2 className="sheet-title">Move {app.name}</h2><p className="sheet-subtitle">Choose where this card belongs.</p></div><MoveRight size={22} color="var(--coral)" /></div>
    <div className="move-section-list">{sections.map((section) => <button type="button" className="move-section-option" key={section.id} onClick={() => onMove(section.id)} disabled={section.id === app.sectionId} data-testid={`button-move-to-section-${section.id}`}><span>{section.title}</span>{section.id === app.sectionId ? <span>Current section</span> : <MoveRight size={15} />}</button>)}</div>
    <div className="sheet-actions"><button className="secondary-button" onClick={onClose}>Cancel</button></div>
  </Modal>;
}

function AppConfirmSheet({ app, onClose, onConfirm }: { app: AppLink; onClose: () => void; onConfirm: () => void }) {
  return <Modal onClose={onClose} label="Confirm app link deletion">
    <div className="sheet-header"><div><h2 className="sheet-title">Delete {app.name}?</h2><p className="sheet-subtitle">This link and its notes will be removed from this device.</p></div><Trash2 size={22} color="var(--coral)" /></div>
    <p className="confirm-copy">This cannot be undone.</p>
    <div className="sheet-actions"><button className="secondary-button" onClick={onClose} data-testid="button-cancel-delete-app">Keep link</button><button className="danger-button" onClick={onConfirm} data-testid="button-confirm-delete-app"><Trash2 size={14} /> Delete link</button></div>
  </Modal>;
}

function RecoverySheet({ hasOriginal, onClose, onDownload, onReplace }: { hasOriginal: boolean; onClose: () => void; onDownload: () => void; onReplace: () => void }) {
  return <Modal onClose={onClose} label="Recover saved dashboard">
    <div className="sheet-header"><div><h2 className="sheet-title">Recover your dashboard</h2><p className="sheet-subtitle">The saved data was not trusted, so local writes are blocked.</p></div><RotateCcw size={22} color="var(--coral)" /></div>
    <p className="confirm-copy">{hasOriginal ? 'The original storage payload is still held unchanged in memory.' : 'The browser could not provide the original storage payload. The temporary view remains available for export.'} Download a recovery bundle first if you want a copy of the original payload and current temporary edits.</p>
    <div className="sheet-actions recovery-actions">
      <button className="secondary-button" onClick={onClose}>Keep working temporarily</button>
      <button className="secondary-button" onClick={onDownload} data-testid="button-download-recovery-bundle">Download recovery bundle</button>
      <button className="danger-button" onClick={onReplace} data-testid="button-confirm-replace-storage"><Trash2 size={14} /> Replace unreadable cache</button>
    </div>
  </Modal>;
}

function RestoreSeedSheet({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return <Modal onClose={onClose} label="Confirm starter dashboard reset">
    <div className="sheet-header"><div><h2 className="sheet-title">Restore the starter layout?</h2><p className="sheet-subtitle">This replaces your customized local dashboard.</p></div><RotateCcw size={22} color="var(--coral)" /></div>
    <p className="confirm-copy">All current custom sections, app links, and notes will be discarded from this device. Restoring the starter layout is not a backup or recovery method.</p>
    <div className="sheet-actions"><button className="secondary-button" onClick={onClose}>Cancel</button><button className="danger-button" onClick={onConfirm} data-testid="button-confirm-restore-seed"><RotateCcw size={14} /> Replace with starter layout</button></div>
  </Modal>;
}

function ConfirmSheet({ section, onClose, onConfirm }: { section?: Section; onClose: () => void; onConfirm: () => void }) {
  return <Modal onClose={onClose} label="Confirm section deletion"><div className="sheet-header"><div><h2 className="sheet-title">Remove this space?</h2><p className="sheet-subtitle">{section?.title} and the links inside it will be removed from this device.</p></div><Trash2 size={22} color="var(--coral)" /></div><p className="confirm-copy">This permanently removes that section and its links from the local dashboard. Restoring the starter layout will not recover deleted custom content.</p><div className="sheet-actions"><button className="secondary-button" onClick={onClose} data-testid="button-cancel-delete-section">Keep it</button><button className="danger-button" onClick={onConfirm} data-testid="button-confirm-delete-section"><Trash2 size={14} /> Remove space</button></div></Modal>;
}

export default App;