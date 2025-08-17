import { NextSeo } from 'next-seo';
import { PrintfulProduct } from '../../types';
import ProductGrid from '../../components/product/ProductGrid';
import Section from '../../components/global/small/section/Section';
import { withGlobalStaticProps } from '../../lib/with-global-static-props';
export const getStaticProps = withGlobalStaticProps();

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

export default Index;
