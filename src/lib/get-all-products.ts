import { PrintfulProduct } from '../types';
import { formatVariantLabel } from './format-variant-label';
import { printful } from './printful-client';
import localProducts from '../data/products.json';

/**
 * Fetches all products from Printful sync API,
 * merges with local metadata, and returns fully
 * assembled product list.
 */
export async function getAllProducts(): Promise<PrintfulProduct[]> {
  // fetch list of product IDs
  const { result: productIds } = await printful.get('sync/products');

  // fetch full product details in parallel
  const allResponses = await Promise.all(
    productIds.map(({ id }) => printful.get(`sync/products/${id}`))
  );

  // map and merge
  return allResponses.map(({ result: { sync_product, sync_variants } }) => {
    const base = {
      ...sync_product,
      variants: sync_variants.map(({ name, ...v }) => ({
        label: formatVariantLabel(name),
        ...v,
      })),
    };

    const metadata = localProducts.find(
      (localProduct) => localProduct.external_id === sync_product.external_id
    );

    if (metadata) {
      return { ...base, ...metadata };
    }

    // fallback if no local metadata
    return {
      ...base,
      slug: sync_product.external_id.toString(),
      categories: [],
      description: '',
    };
  });
}
