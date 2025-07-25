import useWishlistState from '../hooks/useWishlistState';
import ProductGrid from '../components/product/ProductGrid';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import Section from '../components/section/Section';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { hasItems, items } = useWishlistState();

  return (
    <>
      <NextSeo title="Ønskeliste" />
      <h1>Ønskeliste</h1>
      {mounted && hasItems ? (
        <Section>
          <h2>Dine gemte produkter</h2>
          <ProductGrid products={items} />
        </Section>
      ) : (
        <>
          <p>
            Tilføj produkter til din ønskeliste ved at trykke på{' '}
            <Heart strokeWidth="1" color="#fb2c36" size="16" /> ikonet.
          </p>
          <Link href="/" className="link">
            Gå til boutique
          </Link>
        </>
      )}
    </>
  );
}
