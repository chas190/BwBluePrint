import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronUp, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { Section } from '../dashboard-model';

export function SectionTagsList({ tags }: { tags: string[] }) {
  return <ul className="section-hashtag-list">
    {tags.map((tag, index) => <li key={`${tag}-${index}`}>#{tag.replace(/^#+/, '')}</li>)}
  </ul>;
}

export function SectionMenu({ section, editMode, onEdit, onDelete, onShowAllTags }: {
  section: Section;
  editMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onShowAllTags: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 8, left: 8 });
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const anchor = trigger.current?.getBoundingClientRect();
      const bounds = menu.current?.getBoundingClientRect();
      if (!anchor || !bounds) return;
      const left = Math.max(8, Math.min(anchor.right - bounds.width, window.innerWidth - bounds.width - 8));
      const below = anchor.bottom + 7;
      const preferredTop = below + bounds.height <= window.innerHeight - 8 ? below : anchor.top - bounds.height - 7;
      const top = Math.max(8, Math.min(preferredTop, window.innerHeight - bounds.height - 8));
      setPosition({ top, left });
    };
    updatePosition();
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
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
  }, [open, section.tags.length, editMode]);

  const act = (callback: () => void) => {
    setOpen(false);
    trigger.current?.focus();
    callback();
  };

  return <div className="section-menu">
    <button ref={trigger} className="icon-button" onClick={() => setOpen(!open)} aria-label={`Actions for ${section.title}`} aria-expanded={open} aria-controls={open ? `section-menu-${section.id}` : undefined} data-testid={`button-section-menu-${section.id}`}><MoreHorizontal size={16} /></button>
    {open && createPortal(<div ref={menu} id={`section-menu-${section.id}`} className="popover section-actions-popover" style={{ position: 'fixed', top: position.top, left: position.left, right: 'auto', zIndex: 30 }} data-testid={`menu-section-${section.id}`}>
      <button onClick={() => act(onEdit)} data-testid={`button-edit-section-${section.id}`}><Pencil size={14} /> Edit section</button>
      {editMode && <button onClick={() => act(onDelete)} data-testid={`button-delete-section-${section.id}`}><Trash2 size={14} /> Delete section</button>}
      {section.tags.length > 0 && <div className="section-menu-mobile-tags">
        <div className="popover-divider" role="separator" />
        <div className="section-menu-tag-scroll" aria-label={`${section.title} hashtags`} data-testid={`section-menu-tags-${section.id}`}>
          <SectionTagsList tags={section.tags.slice(0, 15)} />
        </div>
        {section.tags.length > 15 && <button className="section-more-tags" onClick={() => act(onShowAllTags)} data-testid={`button-more-section-tags-${section.id}`} aria-haspopup="dialog">More #’s <ChevronUp size={14} /></button>}
      </div>}
    </div>, document.body)}
  </div>;
}