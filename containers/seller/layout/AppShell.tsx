'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

interface AppShellContextValue {
  isSidebarCollapsed: boolean;
  toggleSidebar: VoidFunction;
}

const AppShellContext = createContext({} as AppShellContextValue);

export const useAppShell = () => {
  return useContext(AppShellContext);
};

export const AppShell = (props: PropsWithChildren) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((s) => !s);
  return (
    <AppShellContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      <div className='flex h-full relative'>{props.children}</div>
    </AppShellContext.Provider>
  );
};

export const AppShellSidebar = (
  props: PropsWithChildren<{ width: string }>
) => {
  const { width } = props;
  const { isSidebarCollapsed } = useContext(AppShellContext);
  return (
    <>
      <div className='h-full block md:hidden'>
        <motion.div
          style={{
            width: '100vw',
            height: '100%',
            position: 'fixed',
            zIndex: 10,
            translateX: '-100%',
          }}
          animate={{
            translateX: !isSidebarCollapsed ? '-100%' : '0%',
          }}
          transition={{
            type: 'tween',
            duration: 0.25,
          }}
        >
          {props.children}
        </motion.div>
      </div>
      <div className='hidden md:block h-full'>
        <motion.div
          className='h-full overflow-x-hidden'
          animate={{ width: isSidebarCollapsed ? '0px' : width }}
          transition={{
            type: 'spring',
            duration: 0.3,
            bounce: isSidebarCollapsed ? 0 : 0.2,
          }}
        >
          <motion.div
            style={{
              width,
              height: '100%',
            }}
            animate={{
              translateX: isSidebarCollapsed ? '-10%' : '0%',
            }}
          >
            {props.children}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export const AppShellContent = (props: PropsWithChildren) => {
  return <div className='flex-1 overflow-y-auto'>{props.children}</div>;
};
