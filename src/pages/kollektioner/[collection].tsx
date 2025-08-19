import { NextSeo } from 'next-seo';
import ProductGrid from '../../components/product/ProductGrid';
import Section from '../../components/global/small/section/Section';
import localProducts from '../../data/products.json';
import { getAllProducts } from '../../lib/get-all-products';

export default function CollectionPage({ collection, products }) {
  return (
    <>
      <NextSeo title={collection} />
      <Section>
        <h1>{collection}</h1>
        <ProductGrid products={products} />
      </Section>
    </>
  );
}

export const getStaticPaths = async () => {
  const collections = Array.from(
    new Set(localProducts.map((item) => item.collection))
  );

  const paths = collections.map((collection) => ({
    params: { collection },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const allProducts = await getAllProducts();
  const collection = params.collection;
  const filteredProducts = allProducts.filter(
    (p) => p.collection === collection
  );

  return {
    props: {
      collection,
      products: filteredProducts,
    },
  };
};
