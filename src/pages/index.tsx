import { GetStaticProps } from 'next';
import { PrintfulProduct } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import { NextSeo } from 'next-seo';
import { getAllProducts } from '../lib/get-all-products';
import Hero from '../components/hero/Hero';
import Section from '../components/section/Section';
import Button from '../components/button/Button';
import { Quote } from 'lucide-react';
import Logorow from '../components/logorow/Logorow';

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
          aktive sammen, fordi en sund livs&shy;stil og stærke ven&shy;skaber er
          den bedste måde at leve sit liv på.
        </h2>
      </Section>
      <Logorow />
      <ProductGrid products={products} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  return { props: { products } };
};

export default Index;
