'use client';

import Homepage from '@/components/Homepage';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const store = useStore();
  const router = useRouter();

  const handleNavigate = (view) => {
    if (view === 'collection') router.push('/collection');
    else if (view === 'pdp') router.push('/pdp');
    else if (view === 'admin-login') router.push('/admin-login');
  };

  return (
    <Homepage 
      setCurrentView={handleNavigate}
      addToCart={store.addToCart}
    />
  );
}
