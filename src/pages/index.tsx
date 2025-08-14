import { GetStaticProps } from 'next';
import { PrintfulProduct } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import { NextSeo } from 'next-seo';
import { getAllProducts } from '../lib/get-all-products';
import Hero from '../components/global/small/hero/Hero';
import Section from '../components/global/small/section/Section';
import Button from '../components/global/small/button/Button';
import Logorow from '../components/global/small/logorow/Logorow';
import Card from '../components/global/small/card/Card';
import Row from '../components/global/small/row/Row';
import Link from 'next/link';
import Column from '../components/global/small/column/Column';
import Banner from '../components/global/small/banner/Banner';
import { HeartIcon, InstagramIcon, StarIcon } from 'lucide-react';

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
      <Banner>
        <Link href="https://instagram.com/platonisk.dk" target="_blank">
          <HeartIcon size={12} fill="red" color="transparent" />
          <StarIcon size={12} fill="yellow" color="transparent" />
          Følg os på Instagram
          <StarIcon size={12} fill="yellow" color="transparent" />
          <HeartIcon size={12} fill="red" color="transparent" />
        </Link>
      </Banner>
      <Section>
        <Column>
          <h2>
            Platonisk arbejder for at motivere dig og dine venner til at have en
            fælles aktiv livs&shy;stil, fordi en sund krop og stærke
            ven&shy;skaber er den bedste måde at leve på
            <HeartIcon color="transparent" fill="red" />
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
