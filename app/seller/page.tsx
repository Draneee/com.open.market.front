import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  redirect('/seller/inventory?skip=0&limit=12');
}
