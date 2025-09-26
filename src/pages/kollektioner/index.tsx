import { NextSeo } from 'next-seo';
import products from '../../data/products.json';
import Section from '../../components/global/small/section/Section';
import Card from '../../components/global/small/card/Card';
import Column from '../../components/global/small/column/Column';

const collections = Array.from(new Set(products.flatMap((p) => p.collection)));

export default function Kollektioner() {
  return (
    <>
      <NextSeo title="Alle Kollektioner" />
      <Section>
        <h1>Alle Kollektioner</h1>
        <Column>
          {collections.map((col) => (
            <Card
              key={col}
              href={`/kollektioner/${encodeURIComponent(col.toLowerCase())}`}
              title={`Udforsk ${col} kollektionen`}
            />
          ))}
        </Column>
      </Section>
    </>
  );
}
