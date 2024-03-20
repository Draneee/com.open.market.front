import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { deleteCookieApp } from './helpers/fetch-helpers';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLastPathname = (str: string) =>
  str
    .split('/')
    .filter((itm) => itm !== '')
    .at(-1) ?? [];

export const searchParamtoString = (searchParams: { [key: string]: string }) =>
  new URLSearchParams(searchParams).toString();

export function LogOut(router: AppRouterInstance) {
  deleteCookieApp();
  router.push('/auth/signin');
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    toast.error('Failed to copy to clipboard:', err ?? '');
  }
};
