import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { DataTable } from '@/containers/seller/inventory/data-table';
import { columns } from '@/containers/seller/inventory/columns';
import AddProductButtonDialog from '../../../containers/seller/inventory/add-product-button-dialog';
import LayoutSubmodule from '@/components/ui/layout-submodules';
import { Button } from '@/components/ui/button';
import { LayersIcon } from 'lucide-react';
import { API_URL } from '@/lib/const';
import { searchParamtoString } from '@/lib/utils';
import customFetchServer from '@/lib/custom-fetch-server';

const InventoryPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string };
}) => {
  async function getData() {
    const data = await fetch(
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
      buttonHeader={<AddProductButtonDialog />}
    >
      <div className='flex flex-1 flex-col gap-2 overflow-y-auto'>
        <section className='space-y-4 flex flex-col flex-1 animate overflow-y-auto justify-between'>
          <DataTable columns={columns} data={data?.inventory} />
        </section>
        <DataTablePagination totalItems={data?.total} />
      </div>
    </LayoutSubmodule>
  );
};

export default InventoryPage;
