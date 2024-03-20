import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { DataTable } from '@/containers/seller/inventory/data-table';
import { columns } from '@/containers/seller/inventory/columns';
import AddProductButtonDialog from '../../../containers/seller/inventory/add-product-button-dialog';
import LayoutSubmodule from '@/components/ui/layout-submodules';
import { Button } from '@/components/ui/button';
import { LayersIcon } from 'lucide-react';
import { API_URL } from '@/lib/const';
import { searchParamtoString } from '@/lib/utils';
import DialogEditAddProduct from '@/containers/seller/inventory/dialog-edit-add-product';
import customFetchServer from '@/lib/custom-fetch-server';
import { Suspense } from 'react';
import { Metadata } from 'next';
import DialogPreviewProduct from '@/containers/seller/inventory/dialog-preview-product';
import DialogDeleteProduct from '@/containers/seller/inventory/dialog-delete-product';
export const metadata: Metadata = {
  title: 'Inventory | Open Market',
  description: 'Your Ultimate Marketplace Destination to increaser your sales.',
};
const InventoryPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string };
}) => {
  async function getData() {
    const data = await customFetchServer(
      `${API_URL}/inventory?${searchParamtoString(searchParams)}`,
      {
        method: 'GET',
      }
    );

    if (!data?.ok) return data;
    const res = await data.json();
    return res;
  }

  const data = await getData();

  return (
    <LayoutSubmodule
      submoduleName='Inventory'
      buttonsSideTitle={
        <Button size={'sm'} variant={'ghost'} className='px-0 aspect-square'>
          <LayersIcon className='size-4' />
        </Button>
      }
      buttonHeader={<AddProductButtonDialog searchParams={searchParams} />}
    >
      <div className='flex flex-1 flex-col gap-2 overflow-y-auto'>
        <section className='space-y-4 flex flex-col flex-1 animate overflow-y-auto justify-between'>
          <DataTable columns={columns} data={data?.inventory} />
        </section>
        <section>
          <DataTablePagination totalItems={data?.total} />
          <Suspense>
            <DialogEditAddProduct
              searchParams={searchParams}
              data={data?.inventory}
            />
          </Suspense>
          <Suspense>
            <DialogPreviewProduct data={data?.inventory} />
          </Suspense>
          <Suspense>
            <DialogDeleteProduct />
          </Suspense>
        </section>
      </div>
    </LayoutSubmodule>
  );
};

export default InventoryPage;
