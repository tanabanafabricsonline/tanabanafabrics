'use client';

import PDP from '@/components/PDP';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function PDPPage() {
  const store = useStore();
  const router = useRouter();

  const handleNavigate = (view) => {
    if (view === 'collection') router.push('/collection');
    else if (view === 'home') router.push('/');
  };

  return (
    <PDP 
      setCurrentView={handleNavigate}
      addToCart={store.addToCart}
    />
  );
}
