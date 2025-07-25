import { GetStaticProps } from 'next';
import { PrintfulProduct } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import { NextSeo } from 'next-seo';
import { getAllProducts } from '../lib/get-all-products';
import Hero from '../components/hero/Hero';
import Section from '../components/section/Section';
import Button from '../components/button/Button';
import Logorow from '../components/logorow/Logorow';
import Card from '../components/card/Card';
import Row from '../components/row/Row';
import Link from 'next/link';
import Column from '../components/column/Column';

type IndexProps = {
  featuredProducts: PrintfulProduct[];
};

function Index({ featuredProducts }: IndexProps) {
  return (
    <>
      <NextSeo title="Forside" />
      <Hero>
        <h1>Få pulsen op med CRACKED</h1>
        <Button title="Udforsk kollektion"></Button>
      </Hero>
      <Section>
        <Column>
          <h2>
            Platonisk arbejder for at motivere dig og dine venner til at have en
            fælles aktiv livs&shy;stil, fordi en sund krop og stærke
            ven&shy;skaber er den bedste måde at leve på.
          </h2>
        </Column>
      </Section>
      <Logorow />
      <Section>
        <Column>
          <h2>Nyeste kollektioner</h2>
          <Row>
            <Card href="/kollektioner/mmxxvi" title="MMXXVI" />
            <Card href="/kollektioner/cracked" title="Cracked" />
            <Card href="/kollektioner/active" title="Active" />
          </Row>
          <Link href="/kollektioner" style={{ alignSelf: 'end' }}>
            Udforsk alle kollektioner
          </Link>
        </Column>
      </Section>
      <Logorow />
      <Section>
        <Column>
          <h2>Populære produkter</h2>
          <ProductGrid products={featuredProducts} />
          <Link href="/produkter" style={{ alignSelf: 'end' }}>
            Udforsk alle produkter
          </Link>
        </Column>
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 3);
  return { props: { featuredProducts } };
};

export default Index;
