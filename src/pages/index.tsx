import ProductGrid from '../components/product/ProductGrid';
import { NextSeo } from 'next-seo';
import Hero from '../components/global/small/hero/Hero';
import Section from '../components/global/small/section/Section';
import Button from '../components/global/small/button/Button';
import Logorow from '../components/global/small/logorow/Logorow';
import Card from '../components/global/small/card/Card';
import Row from '../components/global/small/row/Row';
import Link from 'next/link';
import Column from '../components/global/small/column/Column';
import { getAllProducts } from '../lib/get-all-products';

export const getStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: { products },
  };
};
export default function Index({ products }) {
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <NextSeo title="Forside" />
      <Hero>
        <h1>Få pulsen op</h1>
        <Button title="Udforsk kollektion"></Button>
      </Hero>
      <Section>
        <Column>
          <h2>
            Platonisk arbejder for at motivere dig og dine venner til at have en
            fælles aktiv livs&shy;stil, fordi en sund krop og stærke
            ven&shy;skaber er den bedste måde at leve på
          </h2>
        </Column>
      </Section>
      <Section>
        <Column>
          <Row>
            <Card href="/kollektioner/mmxxvi" title="Herretøj" />
            <Card href="/kollektioner/cracked" title="Dametøj" />
            <Card href="/kollektioner/cracked" title="Accessories" />
          </Row>
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
