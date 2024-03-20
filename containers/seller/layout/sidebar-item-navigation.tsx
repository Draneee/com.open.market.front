'use client';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useAppShell } from './AppShell';

const SidebarItemNavigation = ({
  id,
  icon: Icon,
  label,
  searchParams,
  isActive,
}: IProps) => {
  const { toggleSidebar } = useAppShell();
  // const windowWidth = window.innerWidth;
  const snapSidebar = () => {
    // setTimeout(() => {
    //   if (windowWidth < 761) toggleSidebar();
    // }, 400);
  };

  return (
    <div
      key={id}
      className={`transition group rounded ${
        isActive ? 'bg-organizationPrimary' : 'hover:bg-organizationPrimary/40 '
      } `}
    >
      <Link
        href={`/seller/${id}${searchParams ?? ''}`}
        onClick={snapSidebar}
        className='w-full h-full flex items-center gap-2 px-3 py-1 max-md:max-w-[7.5rem] max-md:mx-auto'
      >
        <Icon
          className={`w-4 h-4 transition  text-gray-500 ${
            isActive ? 'text-white' : 'group-hover:text-white'
          }`}
        />
        <span
          className={`transition text-gray-500 whitespace-nowrap text-sm ${
            isActive ? 'text-white' : 'group-hover:text-white'
          }`}
        >
          {label}
        </span>
      </Link>
    </div>
  );
};

export default SidebarItemNavigation;

interface IProps {
  id: string;
  icon: (props: IconProps) => JSX.Element;
  label: string;
  isActive: boolean;
  searchParams?: string;
}
