import RegisterView from '@/containers/auth/register/register-view';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Register | Open Market',
};
export default async function RegisterPage() {
  return <RegisterView />;
}
