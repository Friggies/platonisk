import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { PrintfulProduct } from '../../types';
import ProductGrid from '../../components/product/ProductGrid';
import { getAllProducts } from '../../lib/get-all-products';
import Section from '../../components/section/Section';

type IndexProps = {
  products: PrintfulProduct[];
};

function Index({ products }: IndexProps) {
  return (
    <>
      <NextSeo title="Alle Produkter" />
      <Section>
        <h1>Alle produkter</h1>
        <ProductGrid products={products} />
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  return { props: { products } };
};

export default Index;
