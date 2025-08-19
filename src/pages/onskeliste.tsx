import useWishlistState from '../hooks/useWishlistState';
import ProductGrid from '../components/product/ProductGrid';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import Section from '../components/global/small/section/Section';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { hasItems, items } = useWishlistState();

  return (
    <>
      <NextSeo title="Ønskeliste" />
      <Section>
        <h1>Dine gemte produkter</h1>
        {mounted && hasItems ? (
          <>
            <ProductGrid products={items} />
          </>
        ) : (
          <>
            <p>
              Tilføj produkter til din ønskeliste ved at trykke på{' '}
              <Heart color="red" fill="red" size="16" /> ikonet.
            </p>
            <Link href="/" className="link">
              Gå til boutique
            </Link>
          </>
        )}
      </Section>
    </>
  );
}
