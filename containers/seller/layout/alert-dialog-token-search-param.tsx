'use client';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LogOut } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const AlertDialogTokenSearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorFetch = searchParams.get('errorFetch');
  const [error, setError] = React.useState<string | null>();

  setTimeout(() => {
    setError(errorFetch);
  }, 1);

  return (
    <AlertDialog open={error === '401'}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your token has expired</AlertDialogTitle>
          <AlertDialogDescription>
            Please log in again to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => LogOut(router)}>Go to Login</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogTokenSearchParam;
