import { IconProps } from '@radix-ui/react-icons/dist/types';
import { LayersIcon, LayoutDashboardIcon, ShoppingBag } from 'lucide-react';

export const DATA_MENU_LINKS = [
  {
    label: 'Dashboard',
    icon: (props: IconProps) => <LayoutDashboardIcon {...props} />,
    id: 'dashboard',
  },
  {
    label: 'Orders',
    icon: (props: IconProps) => <ShoppingBag {...props} />,
    id: 'orders',
  },
  {
    id: 'inventory',
    searchParams: '?skip=0&limit=12',
    label: 'Inventory',
    icon: (props: IconProps) => <LayersIcon {...props} />,
  },
];
