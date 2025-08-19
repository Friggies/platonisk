import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import '../styles/main.scss';
import { defaultSEO } from '../../next-seo.config';
import { WishlistProvider } from '../context/wishlist';
import Layout from '../components/Layout';
import { getAllProducts } from '../lib/get-all-products';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WishlistProvider>
      <Layout>
        <DefaultSeo {...defaultSEO} />
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

export default MyApp;
