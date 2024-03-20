import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import React, { Suspense } from 'react';
import { AppShell, AppShellContent, AppShellSidebar } from './AppShell';
import AlertDialogTokenSearchParam from './alert-dialog-token-search-param';
import { Toaster } from 'sonner';
import { getSession } from '@/app/actions/home';

const LayoutComponent = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();
  console.log(session);
  return (
    <body className='h-screen'>
      <AppShell>
        <AppShellSidebar width='240px'>
          <Sidebar />
        </AppShellSidebar>
        <main className='w-full flex flex-col '>
          <Searchbar session={session} />
          <AppShellContent>
            <section className='bg-white h-full container overflow-hidden'>
              {children}
              <Suspense>
                <AlertDialogTokenSearchParam />
              </Suspense>
              <Toaster richColors />
            </section>
          </AppShellContent>
        </main>
      </AppShell>
    </body>
  );
};

export default LayoutComponent;
