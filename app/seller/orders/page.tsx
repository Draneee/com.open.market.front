import Image from 'next/image';
import { Suspense } from 'react';
import WeAreWorking from '../we-are-working';

export default function OrderPage() {
  return (
    <Suspense>
      <WeAreWorking />
    </Suspense>
  );
}
