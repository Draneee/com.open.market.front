'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { uploadProductToInventory } from '@/lib/data.seller';
import { addProductSchema } from '@/lib/utils.seller';
import { Inventory } from '@/types';
import MoneyInput from '@/components/mask-ui/money-input-form';

const AddProductForm = ({
  onOpenChange,
  itemSelected,
}: {
  onOpenChange(): void;
  itemSelected?: Inventory;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      ...itemSelected,
      picture: itemSelected?.pictureUrl,
    },
  });
  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    const res = await uploadProductToInventory(values);
    if (res.statusCode) {
      toast.error(res.message);
    } else {
      onOpenChange();
      toast.success('Product Created Successfully!');
      router.refresh();
    }
  }
  const fileRef = form.register('picture', { required: true });
  return (
    <div className='grid gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <div className='grid gap-2 sm:grid-cols-12 sm:gap-4'>
            <FormField
              control={form.control}
              name='productName'
              render={({ field }) => (
                <FormItem className='col-span-7'>
                  <FormLabel>Name Product</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's the name of your product?"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MoneyInput
              form={form}
              label='Price'
              name='price'
              placeholder='How much?'
              className='col-span-5'
              disabled={form.formState.isSubmitting}
            />
          </div>
          <div className='grid gap-2 sm:grid-cols-12 sm:gap-4'>
            <FormField
              control={form.control}
              name='SKU'
              render={({ field }) => (
                <FormItem className='col-span-7'>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='PRDCT-NM-9999'
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem className='col-span-5'>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='How many units?'
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='picture'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    className='py-1.5'
                    type='file'
                    disabled={form.formState.isSubmitting}
                    {...fileRef}
                  />
                </FormControl>
                <FormDescription className='truncate max-w-72'>
                  {itemSelected
                    ? `Previus Url: ${itemSelected.pictureUrl}`
                    : ''}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end pt-4'>
            <Button
              type='submit'
              className='max-sm:w-full'
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
