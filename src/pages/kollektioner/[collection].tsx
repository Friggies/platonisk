import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { NextSeo } from 'next-seo';
import { printful } from '../../lib/printful-client';
import { PrintfulProduct } from '../../types';
import ProductGrid from '../../components/product/ProductGrid';

interface ExtraProductData {
  printfulId: number;
  slug: string;
  collection: string;
  description: string;
  images: string[];
}

type CollectionPageProps = {
  collection: string;
  products: Array<PrintfulProduct & ExtraProductData>;
};

export default function CollectionPage({
  collection,
  products,
}: CollectionPageProps) {
  return (
    <>
      <NextSeo title={`Collection: ${collection}`} />
      <h1>Collection: {collection}</h1>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No products found in this collection.</p>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Load extra data JSON
  const dataFile = path.join(process.cwd(), 'src', 'data', 'products.json');
  const raw = fs.readFileSync(dataFile, 'utf8');
  const extraData: ExtraProductData[] = JSON.parse(raw);

  // Collect unique collections
  const collections = Array.from(
    new Set(extraData.map((item) => item.collection))
  );

  const paths = collections.map((collection) => ({
    params: { collection },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CollectionPageProps> = async ({
  params,
}) => {
  const collection = params?.collection as string;

  // Load extra data JSON
  const dataFile = path.join(process.cwd(), 'data', 'products.json');
  const raw = fs.readFileSync(dataFile, 'utf8');
  const extraData: ExtraProductData[] = JSON.parse(raw);

  // Fetch Printful product IDs
  const { result: productIds } = await printful.get('sync/products');

  // Fetch full product details and merge with extraData
  const allProducts = await Promise.all(
    productIds.map(({ id }) => printful.get(`sync/products/${id}`))
  );

  const merged: Array<PrintfulProduct & ExtraProductData> = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => {
      const base = {
        ...sync_product,
        variants: sync_variants.map(({ name, ...v }) => ({
          label: name,
          ...v,
        })),
      };
      const extra = extraData.find((d) => d.printfulId === sync_product.id);
      return extra
        ? { ...base, ...extra }
        : {
            ...base,
            printfulId: sync_product.id,
            slug: base.id.toString(),
            collection: 'uncategorized',
            description: '',
            images: [],
          };
    }
  );

  // Filter by collection
  const products = merged.filter((p) => p.collection === collection);

  return {
    props: {
      collection,
      products,
    },
  };
};
