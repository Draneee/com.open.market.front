'use client';
import React from 'react';
import { useAppShell } from './AppShell';
import { PanelLeftOpenIcon } from 'lucide-react';

const ToggleSidebar = ({ className }: { className?: string }) => {
  const { toggleSidebar, isSidebarCollapsed } = useAppShell();
  return (
    <button className={className} onClick={toggleSidebar}>
      <PanelLeftOpenIcon
        className={`size-4 text-muted-foreground ${
          isSidebarCollapsed ? 'scale-x-100' : '-scale-x-100'
        }`}
      />
    </button>
  );
};

export default ToggleSidebar;
