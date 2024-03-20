import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useSps = (
  nameSp: string,
  append?: boolean
): [string, (value: string | number | null) => void] => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const value = params.get(nameSp) ?? '';

  const setValue = (value: string | number | null) => {
    if (value || value === 0) {
      if (append) {
        params.append(nameSp, String(value));
      } else {
        params.set(nameSp, String(value));
      }
    } else {
      params.delete(nameSp);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return [value, setValue];
};

export default useSps;
