import React from 'react';
import OpenMarketLogo from '../seller/layout/open-market-logo';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserRoundIcon } from 'lucide-react';
import DropdownUser from '../seller/layout/dropdown-user';

const Navbar = ({ session }: { session: any }) => {
  const sessionActive = session?.status === 'ok';
  return (
    <header className='border-b h-12 sticky bg-gray-100 top-0 w-full z-30'>
      <nav className='flex justify-between items-center container h-12 '>
        <section>
          <OpenMarketLogo className='opacity-100' />
        </section>
        {sessionActive ? (
          <DropdownUser session={session} />
        ) : (
          <Link
            href={'/auth/signin'}
            className='flex gap-2 items-center opacity-40'
          >
            <Avatar className='size-7 max-sm:hidden'>
              <AvatarFallback className='bg-black'>
                <UserRoundIcon className='size-5 text-muted-foreground text-white' />
              </AvatarFallback>
            </Avatar>
            <p className='text-[0.8rem] text-black font-mono'>SignIn</p>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
