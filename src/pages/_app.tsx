// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/main.scss';

import { WishlistProvider } from '../context/wishlist';
import Layout from '../components/Layout';
import { getAllProducts } from '../lib/get-all-products';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WishlistProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WishlistProvider>
  );
}

export const getStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
};