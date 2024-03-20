'use client';

import { DotsHorizontalIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { useRouter, useSearchParams } from 'next/navigation';

const options = [
  {
    label: 'Preview',
    icon: (props: IconProps) => <EyeIcon {...props} />,
  },
  {
    label: 'Delete',
    icon: (props: IconProps) => <Trash2Icon {...props} />,
  },
  {
    label: 'Edit',
    icon: (props: IconProps) => <Pencil2Icon {...props} />,
  },
];
export function DataTableRowActions({ idItem }: { idItem: number }) {
  const router = useRouter();
  const serachParams = useSearchParams();
  const params = new URLSearchParams(serachParams);
  const switchModalParam = (id: string) => {
    if (params.has(id)) params.delete(id);
    else params.append(id, String(idItem));

    router.push('?' + params.toString());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[120px]'>
        {options.map((itm) => (
          <DropdownMenuItem
            key={itm.label}
            onClick={() => switchModalParam(itm.label)}
          >
            <itm.icon className='text-muted-foreground size-3.5 me-1.5' />
            {itm.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
