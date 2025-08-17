import { GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import ProductGrid from '../../components/product/ProductGrid';
import Section from '../../components/global/small/section/Section';
import localProducts from '../../data/products.json';
import { withGlobalStaticProps } from '../../lib/with-global-static-props';
import { PrintfulProduct } from '../../types';

export default function CollectionPage({
  collection,
  products,
}: {
  collection: string;
  products: PrintfulProduct[];
}) {
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

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps = withGlobalStaticProps<{
  collection: string;
  products: PrintfulProduct[];
}>(async ({ params }, { products }) => {
  const collection = params.collection as string;
  const filteredProducts = products.filter((p) => p.collection === collection);

  return {
    props: {
      collection,
      products: filteredProducts,
    },
  };
});
