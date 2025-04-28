import * as React from 'react';
import { GetStaticProps } from 'next';
import shuffle from 'lodash.shuffle';
import { printful } from '../lib/printful-client';
import { PrintfulProduct } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import { formatVariantLabel } from '../lib/format-variant-label';
import { NextSeo } from 'next-seo';

type IndexProps = {
  products: PrintfulProduct[];
};

function Index({ products }: IndexProps) {
  return (
    <>
      <NextSeo title="Boutique" />
      <h1>Boutique</h1>
      <ProductGrid products={products} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { result: productIds } = await printful.get('sync/products');

  const allProducts = await Promise.all(
    productIds.map(async ({ id }) => await printful.get(`sync/products/${id}`))
  );

  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }) => ({
        label: formatVariantLabel(name),
        ...variant,
      })),
    })
  );

  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default Index;
