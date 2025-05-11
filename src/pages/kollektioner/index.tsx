import { NextSeo } from 'next-seo';
import products from '../../data/products.json';
import { Link } from 'lucide-react';

const collections = Array.from(new Set(products.flatMap((p) => p.collection)));

export default function Kollektioner() {
  return (
    <>
      <NextSeo title="Kollektioner" />
      <h1>Kollektioner</h1>
      <ul>
        {collections.map((col) => (
          <li key={col}>
            <Link href={`/kollektioner/${encodeURIComponent(col)}`}>
              {col}1
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
