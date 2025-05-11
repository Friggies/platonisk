import { GetStaticPaths, GetStaticProps } from 'next';
import ProductVariantPicker from '../../components/product/ProductVariantPicker';
import useWishlistState from '../../hooks/useWishlistState';
import useWishlistDispatch from '../../hooks/useWishlistDispatch';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { getAllProducts } from '../../lib/get-all-products';
import localProducts from '../../data/products.json';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: localProducts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await getAllProducts();
  const slug = params!.slug as string;
  const metadata = localProducts.find(
    (localProduct) => localProduct.slug === slug
  )!;

  const product = products.find(
    (localProduct) => localProduct.external_id === metadata.external_id
  );

  return {
    props: { product },
  };
};

export default function ProductPage({ product }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();
  const { id, name, variants } = product;
  const [firstVariant] = variants;
  const oneStyle = variants.length === 1;

  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );
  const activeVariant = variants.find(
    (v) => v.external_id === activeVariantExternalId
  );
  const activeVariantFile = activeVariant.files.find(
    ({ type }) => type === 'preview'
  );

  const formattedPrice = new Intl.NumberFormat('da', {
    style: 'currency',
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price);

  const addToWishlist = () => addItem(product);
  const onWishlist = isSaved(id);
  return (
    <>
      <button aria-label="Add to wishlist" onClick={addToWishlist}>
        {mounted && onWishlist ? (
          <Heart strokeWidth="1" fill="#fb2c36" />
        ) : (
          <Heart strokeWidth="1" />
        )}
      </button>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{formattedPrice}</p>
      <ProductVariantPicker
        value={activeVariantExternalId}
        onChange={({ target: { value } }) => setActiveVariantExternalId(value)}
        variants={variants}
        disabled={oneStyle}
      />
      <button
        className="snipcart-add-item"
        data-item-id={activeVariantExternalId}
        data-item-price={activeVariant.retail_price}
        data-item-url={`/api/products/${activeVariantExternalId}`}
        data-item-description={activeVariant.label}
        data-item-image={activeVariantFile.preview_url}
        data-item-name={name}
      >
        Bestil
      </button>
    </>
  );
}
