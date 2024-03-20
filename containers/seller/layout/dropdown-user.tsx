'use client';
import React from 'react';
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
import Link from 'next/link';
import { LogOut } from '@/lib/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/navigation';

const DropdownUser = ({ session }: { session: any }) => {
  const router = useRouter();
  const handleSignOut = async () => LogOut(router);
  useHotkeys('shift+q', () => handleSignOut());
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          className='flex gap-2 focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          <Avatar className='size-7 '>
            <AvatarImage src='https://res.cloudinary.com/dynscts1t/image/upload/v1710014141/Logo_11_qnmquh.png' />
            <AvatarFallback className='text-white bg-black'>AD</AvatarFallback>
          </Avatar>
          <section className='flex flex-col max-sm:hidden'>
            <p className='text-sm font-mono max-w-28 truncate'>
              {session?.nickname}
            </p>
          </section>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Open Market Demo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={'/seller/inventory?skip=0&limit=12'}>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
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
  );
};

export default DropdownUser;
