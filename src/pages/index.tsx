import { GetStaticProps } from 'next';
import { PrintfulProduct } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import { NextSeo } from 'next-seo';
import { getAllProducts } from '../lib/get-all-products';
import Hero from '../components/hero/Hero';
import Section from '../components/section/Section';
import Button from '../components/button/Button';
import { Quote } from 'lucide-react';

type IndexProps = {
  products: PrintfulProduct[];
};

function Index({ products }: IndexProps) {
  return (
    <>
      <NextSeo title="Hi" />
      <Hero>
        <h1>Hi</h1>
        <Button title="Udforsk"></Button>
      </Hero>

      <Section>
        <h2>
          Platonisk stræber efter at motivere dig og dine venner til at være
          aktive sammen, fordi en sund livssting og stærke venskaber er den
          bedste måde at leve sit liv på.
        </h2>
      </Section>
      <ProductGrid products={products} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  return { props: { products } };
};

export default Index;
