'use client';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import AdminFilters from './admin-filters';

const FitlersSection = ({
  maxPrice,
  session,
}: {
  maxPrice: number;
  session: any;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentParams = new URLSearchParams(searchParams);

  const params = new URLSearchParams(searchParams);
  const handleSearch = useDebouncedCallback((term) => {
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  const handleRangeNumber = useDebouncedCallback((term: number[]) => {
    const params = new URLSearchParams(searchParams);
    if (term && term[0] !== 0) {
      params.set('range', String(term[0]));
    } else {
      params.delete('range');
    }
    if (term[0] === 0) params.delete('range');
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  const defaultSliderValue = Number(currentParams.get('range') ?? '');

  const [sliderValue, setSliderValue] = React.useState<number[]>([
    defaultSliderValue,
  ]);
  const [search, setSearch] = React.useState<string>();
  const handleSlider = (term: number[]) => {
    setSliderValue(term);
    handleRangeNumber(term);
  };

  const clearParams = () => {
    setSliderValue([0]);
    setSearch('');
    setCheckbox({});
    router.replace(pathname, {
      scroll: false,
    });
    router.refresh();
  };
  const admin = session?.rol === 'admin';

  const [checkbox, setCheckbox] = React.useState<{
    [key: number]: boolean;
  }>({});

  return (
    <Suspense>
      <section className='lg:w-72 space-y-4 max-lg:max-w-xl max-lg:mx-auto max-lg:w-full px-2'>
        <header>
          <section className='flex justify-between items-end'>
            <p className='font-medium'>Filters</p>
            {currentParams.size > 0 ? (
              <button
                onClick={clearParams}
                className='text-xs underline text-gray-500 mb-1'
              >
                Remove
              </button>
            ) : (
              <></>
            )}
          </section>
          <Input
            placeholder='Search by name or SKU product...'
            value={search}
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
          />
        </header>
        <section>
          <Slider
            value={sliderValue}
            min={0}
            max={maxPrice}
            step={1}
            onValueChange={handleSlider}
          />
          <section className='flex justify-between text-sm mt-1 text-muted-foreground'>
            <span>$0</span>
            <span>${maxPrice ?? 0}</span>
          </section>
        </section>
        {admin && (
          <AdminFilters setCheckbox={setCheckbox} checkbox={checkbox} />
        )}
      </section>
    </Suspense>
  );
};

export default FitlersSection;
