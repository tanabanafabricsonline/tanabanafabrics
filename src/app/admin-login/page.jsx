'use client';

import AdminLogin from '@/components/AdminLogin';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const store = useStore();
  const router = useRouter();

  const handleAdminSuccess = (adminUser) => {
    store.handleAdminLoginSuccess(adminUser);
    router.push('/admin');
  };

  return (
    <AdminLogin 
      onAdminLoginSuccess={handleAdminSuccess}
      onCancel={() => router.push('/')}
    />
  );
}
