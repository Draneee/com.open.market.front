'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data/data-table-row-actions';
import { DataTableColumnHeader } from './data/data-table-column-header';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'SKU',
    header: ({ column }) => (
      <DataTableColumnHeader className='text-xs' column={column} title='SKU' />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('SKU')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('productName')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => (
      <div>$ {Number(row.getValue('price')).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Quantity' />
    ),
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions idItem={row.original['id']} />,
    enableSorting: false,
    enableHiding: false,
  },
];
