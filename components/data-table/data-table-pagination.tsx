'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useSps from '@/hooks/useSps';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export function DataTablePagination({ totalItems }: { totalItems: number }) {
  const [limit, setLimit] = useSps('limit');
  const [skip, setSkip] = useSps('skip');
  const total = totalItems;
  const totalPage = Math.ceil(total / parseInt(limit));
  const page = parseInt(skip) / parseInt(limit);

  const handlePage = (pagS: number) => {
    setSkip(Math.floor(pagS * Number(limit)));
  };

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleRows = (value: string) => {
    let resUrl = params;
    setLimit(value);
    setSkip(0);

    resUrl.set('limit', value);
    resUrl.set('skip', '0');

    replace(`${pathname}?${resUrl.toString()}`);
  };
  return (
    <Suspense>
      <div className='flex max-md:flex-col-reverse max-md:gap-4 items-center justify-between px-2 w-full pb-1'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Filas por pagina</p>
          <Select value={limit} onValueChange={handleRows}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={12} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[12, 24, 48, 72].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center lg:space-x-1'>
          <div className='flex items-center justify-center text-sm font-medium'>
            Pagina {page + 1} de {isNaN(totalPage) ? page + 1 : totalPage}
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => handlePage(0)}
              disabled={page === 0}
            >
              <span className='sr-only'>Go to first page</span>
              <DoubleArrowLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => handlePage(page - 1)}
              disabled={page === 0}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => handlePage(page + 1)}
              disabled={1 + page === totalPage}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => handlePage(totalPage - 1)}
              disabled={1 + page === totalPage}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
