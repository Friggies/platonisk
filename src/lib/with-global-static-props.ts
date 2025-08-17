import type {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { getAllProducts } from './get-all-products';
import type { PrintfulProduct } from '../types';

type GlobalProps = {
  products: PrintfulProduct[];
};

// Extra "ctx" we provide *on top* of Next.js GetStaticPropsContext
type GlobalStaticContext = {
  products: PrintfulProduct[];
};

/**
 * Wrap a page's getStaticProps with global props (like `products`).
 *
 * 🚀 Enhancement:
 * - Page's getStaticProps now optionally receives a **second argument**
 *   containing global props (e.g. `{ products }`).
 * - This is backwards‑compatible — old usage still works.
 */
export function withGlobalStaticProps<P extends Record<string, any> = {}>(
  pageGetStaticProps?: (
    ctx: GetStaticPropsContext,
    global: GlobalStaticContext
  ) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>
): GetStaticProps<P & GlobalProps> {
  return async function getStaticPropsWithGlobal(
    context: GetStaticPropsContext
  ): Promise<GetStaticPropsResult<P & GlobalProps>> {
    // Fetch global products once here
    const products = await getAllProducts();

    // Run page-level getStaticProps if provided
    const pageResult: GetStaticPropsResult<P> = pageGetStaticProps
      ? await pageGetStaticProps(context, { products })
      : { props: {} as P };

    // If redirect or notFound, pass through as-is
    if ('redirect' in pageResult || 'notFound' in pageResult) {
      return pageResult as GetStaticPropsResult<P & GlobalProps>;
    }

    // Merge props with global data
    return {
      ...pageResult,
      props: {
        ...pageResult.props,
        products,
      },
    };
  };
}
