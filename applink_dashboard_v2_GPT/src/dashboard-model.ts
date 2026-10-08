export type Note = {
  id: string;
  text: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Priority = 'p1' | 'p2' | 'p3' | 'p4' | 'none';

export type AppLink = {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  icon: string;
  overlayColor: string;
  overlayOpacity: number;
  tags: string[];
  priority: Priority;
  favorite: boolean;
  sortOrder: number;
  createdAt: string;
  launchCount: number;
  lastOpenedAt: string | null;
  notes: Note[];
};

export type Section = {
  id: string;
  title: string;
  tags: string[];
  priority: Priority;
  sortOrder: number;
  collapsed: boolean;
};

export type StoreData = { sections: Section[]; apps: AppLink[] };

export type DashboardReadResult =
  | { status: 'missing'; data: null; raw: null; warning: null }
  | { status: 'valid'; data: StoreData; raw: string; warning: string | null }
  | { status: 'invalid'; data: null; raw: string | null; warning: string };

export function canWriteDashboard(result: Pick<DashboardReadResult, 'status'>) {
  return result.status !== 'invalid';
}

const priorities = new Set<Priority>(['p1', 'p2', 'p3', 'p4', 'none']);
const migratedDate = new Date(0).toISOString();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isValidDate(value: unknown): value is string {
  return isString(value)
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    && Number.isFinite(Date.parse(value));
}

function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && priorities.has(value as Priority);
}

function isValidNote(value: unknown): value is Note {
  if (!isRecord(value) || !isString(value.id) || !value.id.trim() || !isString(value.text) || typeof value.pinned !== 'boolean') return false;
  if (value.createdAt !== undefined && !isValidDate(value.createdAt)) return false;
  if (value.updatedAt !== undefined && !isValidDate(value.updatedAt)) return false;
  return true;
}

function isValidSection(value: unknown): value is Section {
  return isRecord(value)
    && isString(value.id) && Boolean(value.id.trim())
    && isString(value.title)
    && isStringArray(value.tags)
    && isPriority(value.priority)
    && typeof value.sortOrder === 'number' && Number.isFinite(value.sortOrder)
    && typeof value.collapsed === 'boolean';
}

function isValidApp(value: unknown): value is AppLink {
  return isRecord(value)
    && isString(value.id) && Boolean(value.id.trim())
    && isString(value.sectionId) && Boolean(value.sectionId.trim())
    && isString(value.name)
    && isString(value.description)
    && isString(value.url)
    && isString(value.imageUrl)
    && isString(value.icon)
    && isString(value.overlayColor)
    && typeof value.overlayOpacity === 'number' && Number.isFinite(value.overlayOpacity) && value.overlayOpacity >= 0 && value.overlayOpacity <= 1
    && isStringArray(value.tags)
    && isPriority(value.priority)
    && typeof value.favorite === 'boolean'
    && typeof value.sortOrder === 'number' && Number.isFinite(value.sortOrder)
    && (value.createdAt === undefined || isValidDate(value.createdAt))
    && typeof value.launchCount === 'number' && Number.isInteger(value.launchCount) && value.launchCount >= 0
    && (value.lastOpenedAt === null || isValidDate(value.lastOpenedAt))
    && Array.isArray(value.notes) && value.notes.every(isValidNote);
}

function hasUniqueIds(items: Array<{ id: string }>) {
  return new Set(items.map((item) => item.id)).size === items.length;
}

export function normalizeAppOrders(apps: AppLink[]): AppLink[] {
  const bySection = new Map<string, AppLink[]>();
  apps.forEach((app, index) => {
    const current = bySection.get(app.sectionId) ?? [];
    current.push({ ...app, sortOrder: Number.isFinite(app.sortOrder) ? app.sortOrder : index });
    bySection.set(app.sectionId, current);
  });
  return [...bySection.values()].flatMap((items) => items.sort((a, b) => a.sortOrder - b.sortOrder).map((app, sortOrder) => ({ ...app, sortOrder })));
}

export function normalizeSectionOrders(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => a.sortOrder - b.sortOrder).map((section, sortOrder) => ({ ...section, sortOrder }));
}

export function reorderSection(sections: Section[], sectionId: string, direction: -1 | 1): Section[] {
  const ordered = normalizeSectionOrders(sections);
  const from = ordered.findIndex((section) => section.id === sectionId);
  const to = from + direction;
  if (from < 0 || to < 0 || to >= ordered.length) return sections;
  [ordered[from], ordered[to]] = [ordered[to], ordered[from]];
  return ordered.map((section, sortOrder) => ({ ...section, sortOrder }));
}

export function moveAppOrder(apps: AppLink[], appId: string, direction: -1 | 1, visibleOrder?: string[]): AppLink[] {
  const app = apps.find((item) => item.id === appId);
  if (!app) return apps;
  const siblings = apps.filter((item) => item.sectionId === app.sectionId).sort((a, b) => a.sortOrder - b.sortOrder);
  const displayed = visibleOrder ?? siblings.map((item) => item.id);
  const visibleIndex = displayed.indexOf(appId);
  const neighborId = displayed[visibleIndex + direction];
  if (!neighborId) return apps;
  const from = siblings.findIndex((item) => item.id === appId);
  if (from < 0) return apps;
  const [moving] = siblings.splice(from, 1);
  const targetIndex = siblings.findIndex((item) => item.id === neighborId);
  if (targetIndex < 0) return apps;
  siblings.splice(targetIndex + (direction > 0 ? 1 : 0), 0, moving);
  const positions = new Map(siblings.map((item, order) => [item.id, order]));
  return normalizeAppOrders(apps.map((item) => positions.has(item.id) ? { ...item, sortOrder: positions.get(item.id)! } : item));
}

export function moveAppToSectionOrder(apps: AppLink[], appId: string, sectionId: string): AppLink[] {
  const app = apps.find((item) => item.id === appId);
  if (!app) return apps;
  const destinationOrder = apps.filter((item) => item.sectionId === sectionId && item.id !== appId).length;
  return normalizeAppOrders(apps.map((item) => item.id === appId ? { ...item, sectionId, sortOrder: destinationOrder } : item));
}

export function insertAppInSection(apps: AppLink[], appId: string, sectionId: string, beforeId?: string): AppLink[] {
  const app = apps.find((item) => item.id === appId);
  if (!app || beforeId === appId) return apps;
  const destination = apps.filter((item) => item.sectionId === sectionId && item.id !== appId).sort((a, b) => a.sortOrder - b.sortOrder);
  const targetIndex = beforeId ? destination.findIndex((item) => item.id === beforeId) : -1;
  if (beforeId && targetIndex < 0) return apps;
  destination.splice(targetIndex < 0 ? destination.length : targetIndex, 0, { ...app, sectionId });
  const orderedIds = new Map(destination.map((item, index) => [item.id, index]));
  return normalizeAppOrders(apps.map((item) => item.id === appId
    ? { ...item, sectionId, sortOrder: orderedIds.get(appId)! }
    : item.sectionId === sectionId
      ? { ...item, sortOrder: orderedIds.get(item.id) ?? item.sortOrder }
      : item));
}

export function duplicateApp(app: AppLink, createId: (prefix: 'app' | 'note') => string, now = new Date().toISOString()): AppLink {
  return {
    ...app,
    id: createId('app'),
    name: `${app.name} copy`,
    createdAt: now,
    launchCount: 0,
    lastOpenedAt: null,
    notes: app.notes.map((note) => ({ ...note, id: createId('note'), createdAt: now, updatedAt: now })),
  };
}

export function parseDashboardPayload(raw: string, migrateImageUrl: (url: string) => string = (url) => url): DashboardReadResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { status: 'invalid', data: null, raw, warning: 'The saved dashboard is not valid JSON. Its original contents are retained and will not be overwritten.' };
  }
  if (!isRecord(parsed) || !Array.isArray(parsed.sections) || !Array.isArray(parsed.apps)) {
    return { status: 'invalid', data: null, raw, warning: 'The saved dashboard does not contain valid sections and app lists. Its original contents are retained and will not be overwritten.' };
  }
  if (!parsed.sections.every(isValidSection) || !parsed.apps.every(isValidApp)) {
    return { status: 'invalid', data: null, raw, warning: 'One or more saved section, app, note, or date records are malformed. The original contents are retained and will not be overwritten.' };
  }

  const sections = parsed.sections as Section[];
  const rawApps = parsed.apps as AppLink[];
  const allNotes = rawApps.flatMap((app) => app.notes);
  if (!hasUniqueIds(sections) || !hasUniqueIds(rawApps) || !hasUniqueIds(allNotes)) {
    return { status: 'invalid', data: null, raw, warning: 'The saved dashboard contains duplicate section, app, or note IDs. The original contents are retained and will not be overwritten.' };
  }

  const orphanApps = rawApps.filter((app) => !sections.some((section) => section.id === app.sectionId));
  let recoveredSections = sections;
  let recoveredApps = rawApps;
  let warning: string | null = null;
  if (orphanApps.length) {
    let recoveryId = 'recovered-links';
    let suffix = 2;
    while (sections.some((section) => section.id === recoveryId)) recoveryId = `recovered-links-${suffix++}`;
    const recoverySection: Section = { id: recoveryId, title: 'Recovered links', tags: ['recovered'], priority: 'p3', sortOrder: sections.length, collapsed: false };
    recoveredSections = [...sections, recoverySection];
    recoveredApps = rawApps.map((app) => orphanApps.some((orphan) => orphan.id === app.id) ? { ...app, sectionId: recoveryId } : app);
    warning = `${orphanApps.length} link${orphanApps.length === 1 ? '' : 's'} referenced missing sections and ${orphanApps.length === 1 ? 'was' : 'were'} moved into a Recovered links section.`;
  }

  const migratedApps = recoveredApps.map((app) => ({
    ...app,
    imageUrl: migrateImageUrl(app.imageUrl),
    createdAt: app.createdAt ?? migratedDate,
    notes: app.notes.map((note) => ({
      ...note,
      createdAt: note.createdAt ?? note.updatedAt ?? migratedDate,
      updatedAt: note.updatedAt ?? note.createdAt ?? migratedDate,
    })),
  }));

  return {
    status: 'valid',
    raw,
    warning,
    data: { sections: normalizeSectionOrders(recoveredSections), apps: normalizeAppOrders(migratedApps) },
  };
}

export function readDashboardStorage(
  readRaw: () => string | null,
  migrateImageUrl?: (url: string) => string,
): DashboardReadResult {
  try {
    const raw = readRaw();
    return raw === null
      ? { status: 'missing', data: null, raw: null, warning: null }
      : parseDashboardPayload(raw, migrateImageUrl);
  } catch {
    return { status: 'invalid', data: null, raw: null, warning: 'Saved dashboard storage could not be read. No changes will be written until you explicitly replace the unreadable cache.' };
  }
}