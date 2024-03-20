import LayoutComponent from '@/containers/seller/layout/layout-component';
import type { Metadata } from 'next';
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <LayoutComponent>
        <Suspense>{children}</Suspense>
      </LayoutComponent>
    </html>
  );
}
