import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface IconDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
const IconDrawer = ({
  isOpen,
  onClose,
  title,
  children
}: IconDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-xl transform transition-transform duration-300 ease-out" style={{
      height: '90vh'
    }}>
        
        {/* Top bar */}
        <div className="bg-black text-white px-4 py-3 -mt-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div style={{
        height: 'calc(90vh - 64px)'
      }} className="p-6 overflow-y-auto px-0 py-0">
          {children}
        </div>
      </div>
    </div>;
};
export default IconDrawer;
