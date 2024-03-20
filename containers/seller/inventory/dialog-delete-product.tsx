'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/const';
import customFetchClient from '@/lib/custom-fetch-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { toast } from 'sonner';

const DialogDeleteProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.has('Delete');
  const params = new URLSearchParams(searchParams);
  const deleteParam = () => {
    params.delete('Delete');
    router.push('?' + params.toString());
  };
  const handleDeleteProduct = async () => {
    const itemId = searchParams.get('Delete');
    const res = await customFetchClient(`${API_URL}/inventory/${itemId}`, {
      method: 'Delete',
    });
    const json = await res.json();

    if (!res.ok) {
      return toast.error(json.message);
    }
    deleteParam();
    router.refresh();
    toast.success('Successful deletion!');
  };
  return (
    <Suspense>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={deleteParam}>Cancel</AlertDialogCancel>
            <Button onClick={() => handleDeleteProduct()}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Suspense>
  );
};

export default DialogDeleteProduct;
