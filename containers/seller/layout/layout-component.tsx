import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import React from 'react';
import { AppShell, AppShellContent, AppShellSidebar } from './AppShell';
import AlertDialogTokenSearchParam from './alert-dialog-token-search-param';

const LayoutComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <body className='h-screen'>
      <AppShell>
        <AppShellSidebar width='240px'>
          <Sidebar />
        </AppShellSidebar>
        <main className='w-full flex flex-col '>
          <Searchbar />
          <AppShellContent>
            <section className='bg-white h-full container overflow-hidden'>
              {children}
              <section>{/* <AlertDialogTokenSearchParam /> */}</section>
            </section>
          </AppShellContent>
        </main>
      </AppShell>
    </body>
  );
};

export default LayoutComponent;
