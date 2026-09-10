'use client';

import AdminDashboard from '@/components/AdminDashboard';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const store = useStore();
  const router = useRouter();

  const handleLogout = () => {
    store.handleLogout();
    router.push('/');
  };

  return (
    <AdminDashboard 
      currentUser={store.currentUser}
      currentAnnouncementText={store.announcementText}
      currentIsCodEnabled={store.isCodEnabled}
      onSaveStoreSettings={store.handleSaveStoreSettings}
      onNavigateHome={() => router.push('/')}
      onLogout={handleLogout}
      orders={store.orders}
      onUpdateOrderStatus={store.handleUpdateOrderStatus}
      onPlaceOrder={store.handlePlaceOrder}
    />
  );
}
