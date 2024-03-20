'use client';
import React, { Suspense } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CardStackPlusIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import AddProductForm from './add-product-form';

const DialogEditAddProduct = ({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | string };
  data: any[];
}) => {
  const params = new URLSearchParams(searchParams);
  const AddOrEdit = params.has('Add')
    ? 'Add'
    : params.has('Edit')
    ? 'Edit'
    : undefined;

  if (!AddOrEdit) return;
  const router = useRouter();
  const isOpen = params.has(AddOrEdit);

  const [open, setopen] = React.useState(false);
  setTimeout(() => {
    setopen(isOpen);
  }, 200);

  const deleteParam = () => {
    params.delete(AddOrEdit);
    router.push('?' + params.toString());
  };

  function LayoutDialog(props: { children: React.ReactNode }) {
    return (
      <DialogContentAlert
        open={open}
        deleteParam={deleteParam}
        AddOrEdit={AddOrEdit}
      >
        {props.children}
      </DialogContentAlert>
    );
  }

  if (AddOrEdit === 'Add')
    return (
      <LayoutDialog>
        <AddProductForm onOpenChange={deleteParam} />
      </LayoutDialog>
    );

  if (AddOrEdit === 'Edit') {
    const id = parseInt(params.get(AddOrEdit) ?? '');
    const itemSelected = data?.find((item) => item.id === id);
    return (
      <LayoutDialog>
        <AddProductForm
          onOpenChange={deleteParam}
          itemSelected={itemSelected}
        />
      </LayoutDialog>
    );
  }
};

function DialogContentAlert(props: any) {
  return (
    <Suspense>
      <Dialog onOpenChange={props.deleteParam} open={props.open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.AddOrEdit} Product</DialogTitle>
            <DialogDescription>
              {props.AddOrEdit === 'Add'
                ? 'Create New Item'
                : 'Refine Product Details'}
            </DialogDescription>
          </DialogHeader>
          {props.children}
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}

export default DialogEditAddProduct;
