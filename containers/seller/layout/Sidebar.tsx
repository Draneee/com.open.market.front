import { Separator } from '@/components/ui/separator';
import MenuLinks from './menu-links';
import ToggleSidebar from './toggle-sidebar';
import OpenMarketLogo from './open-market-logo';

export default function Sidebar() {
  return (
    <aside className='bg-gray-100 flex flex-col justify-between pb-12 border-e h-full'>
      <section className='space-y-4'>
        <section>
          <div className='relative max-w-xl mx-auto inset-x-0 w-full'>
            <ToggleSidebar className='absolute right-4 top-3 md:hidden' />
          </div>
          <div className='grid place-items-center h-12 border-b '>
            <OpenMarketLogo />
          </div>
        </section>
        <section className='px-4 space-y-6 max-md:max-w-xl max-md:mx-auto'>
          <MenuLinks />
        </section>
      </section>
    </aside>
  );
}
