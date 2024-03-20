'use client';
import SidebarItemNavigation from './sidebar-item-navigation';
import { Separator } from '../../../components/ui/separator';
import { DATA_MENU_LINKS } from '@/lib/const/SIDEBAR';
import { usePathname } from 'next/navigation';
import { getLastPathname } from '@/lib/utils';

const MenuLinks = () => {
  const pathname = getLastPathname(usePathname());
  return (
    <section className='space-y-2 max-md:text-center'>
      <div className='text-xs text-gray-400'>
        <span>Menu links</span>
        <Separator />
      </div>
      <section className='space-y-2'>
        <div>
          {DATA_MENU_LINKS.map((itm, idx) => (
            <SidebarItemNavigation
              key={itm.id}
              isActive={pathname === itm.id}
              {...itm}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default MenuLinks;
