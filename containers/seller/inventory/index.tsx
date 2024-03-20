import LayoutSubmodule from '@/components/ui/layout-submodules';
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardStackPlusIcon } from '@radix-ui/react-icons';
import { Shapes } from 'lucide-react';

const ManageProducts = async () => {
  return (
    <LayoutSubmodule
      submoduleName='Manage Products'
      buttonHeader={
        <Button className='font-mono group'>
          Add Product
          <span className='group-hover:w-4 w-0 transition-all group-hover:translate-x-0 -translate-x-10 group-hover:ms-2'>
            <CardStackPlusIcon className='group-hover:opacity-100 opacity-0 transition-all' />
          </span>
        </Button>
      }
      buttonsSideTitle={
        <Button size={'sm'}>
          <Shapes />
        </Button>
      }
    >
      <div className='space-y-4'></div>
    </LayoutSubmodule>
  );
};

export default ManageProducts;
