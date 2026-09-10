import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import StorefrontWrapper from '@/components/StorefrontWrapper';

export const metadata = {
  title: 'Tanabana Fabrics | Luxury Pakistani Unstitched Suits',
  description: 'Discover luxury unstitched Pakistani fabrics, Giza Cotton, Spun Boski Silk, Karandi, and Lawn suits with nationwide PKR delivery.',
  keywords: 'Tanabana Fabrics, Boski Silk, Giza Cotton, Unstitched Suits Pakistan, Luxury Mens Fabrics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAF8F5] text-[#1E293B]">
        <StoreProvider>
          <StorefrontWrapper>
            {children}
          </StorefrontWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
