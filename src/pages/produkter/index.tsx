import { NextSeo } from 'next-seo';
import ProductGrid from '../../components/product/ProductGrid';
import Section from '../../components/global/small/section/Section';
import { getAllProducts } from '../../lib/get-all-products';

export const getStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: { products },
  };
};

function Index({ products }) {
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

export default Index;
