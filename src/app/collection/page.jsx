'use client';

import CollectionListing from '@/components/CollectionListing';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function CollectionPage() {
  const store = useStore();
  const router = useRouter();

  const handleNavigate = (view) => {
    if (view === 'home') router.push('/');
    else if (view === 'pdp') router.push('/pdp');
  };

  return (
    <CollectionListing 
      setCurrentView={handleNavigate}
      addToCart={store.addToCart}
    />
  );
}
