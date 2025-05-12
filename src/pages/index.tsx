import { GetStaticProps } from 'next';
import { PrintfulProduct } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import { NextSeo } from 'next-seo';
import { getAllProducts } from '../lib/get-all-products';
import Hero from '../components/hero/Hero';
import Section from '../components/section/Section';

type IndexProps = {
  products: PrintfulProduct[];
};

function Index({ products }: IndexProps) {
  return (
    <>
      <NextSeo title="Hi" />
      <Hero>
        <h1>Hi</h1>
      </Hero>

      <Section>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          itaque nemo minima nisi tenetur perferendis, quae fugit dolor aliquid
          autem iure quos recusandae, repellat officiis amet sequi odit magnam
          sed.
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
