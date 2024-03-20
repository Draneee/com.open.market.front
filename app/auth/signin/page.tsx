import { LoginView } from '@/containers/auth/signin/login-view';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sign In | Open Market',
};
export default function LoginPage() {
  return <LoginView />;
}
