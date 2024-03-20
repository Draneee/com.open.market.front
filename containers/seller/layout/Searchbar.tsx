'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import ToggleSidebar from './toggle-sidebar';
import { LogOut } from '@/lib/utils';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link';

export default function Searchbar() {
  const router = useRouter();
  const handleSignOut = async () => LogOut(router);
  useHotkeys('shift+q', () => handleSignOut());
  return (
    <header className='border-b h-12 bg-gray-200/40'>
      <nav className='flex justify-between items-center container h-12 '>
        <ToggleSidebar />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className='flex gap-2 focus-visible:ring-0 focus-visible:ring-offset-0'
            >
              <Avatar className='size-7 '>
                <AvatarImage src='https://res.cloudinary.com/dynscts1t/image/upload/v1710014141/Logo_11_qnmquh.png' />
                <AvatarFallback className='text-white bg-black'>
                  AD
                </AvatarFallback>
              </Avatar>
              <section className='flex flex-col max-sm:hidden'>
                <p className='text-sm font-mono max-w-28 truncate'>
                  Adrian Avila
                </p>
              </section>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Open Market Demo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'https://github.com/Draneee'} target='_blank'>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </Link>
            <Link href={'https://github.com/Draneee'} target='_blank'>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </Link>
            <Link href={'https://github.com/Draneee'} target='_blank'>
              <DropdownMenuItem>API</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Log out
              <DropdownMenuShortcut>⇧Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
