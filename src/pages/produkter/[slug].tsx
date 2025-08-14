import { GetStaticPaths, GetStaticProps } from 'next';
import ProductVariantPicker from '../../components/product/ProductVariantPicker';
import useWishlistState from '../../hooks/useWishlistState';
import useWishlistDispatch from '../../hooks/useWishlistDispatch';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { getAllProducts } from '../../lib/get-all-products';
import localProducts from '../../data/products.json';
import Section from '../../components/global/small/section/Section';
import Row from '../../components/global/small/row/Row';
import Column from '../../components/global/small/column/Column';
import ProductImage from '../../components/product/ProductImage';
import Logorow from '../../components/global/small/logorow/Logorow';
import Card from '../../components/global/small/card/Card';
import Link from 'next/link';
import ProductGrid from '../../components/product/ProductGrid';
import { NextSeo } from 'next-seo';

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

  const relatedProducts = products
    .filter(
      (p) =>
        p.external_id !== product.external_id &&
        p.collection === product.collection
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return {
    props: { product, relatedProducts },
  };
};

export default function ProductPage({ product, relatedProducts }) {
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
      <NextSeo
        title={`${product.name} - ${product.color.toUpperCase()}`}
        description={product.description}
      />
      <Section>
        <Row>
          <Column>
            <ProductImage src={product.thumbnail_url} />
          </Column>
          <Column>
            <button aria-label="Add to wishlist" onClick={addToWishlist}>
              {mounted && onWishlist ? (
                <h1>
                  <Heart strokeWidth="1" size="30" fill="#155332" />
                  {product.name}
                </h1>
              ) : (
                <h1>
                  <Heart strokeWidth="1" size="30" />
                  {product.name}
                </h1>
              )}
            </button>
            <p>
              <strong>{formattedPrice}</strong>
            </p>
            <ProductVariantPicker
              value={activeVariantExternalId}
              onChange={({ target: { value } }) =>
                setActiveVariantExternalId(value)
              }
              variants={variants}
              disabled={oneStyle}
            />
            <button
              className="snipcart-add-item serif"
              data-item-id={activeVariantExternalId}
              data-item-price={activeVariant.retail_price}
              data-item-url={`/api/products/${activeVariantExternalId}`}
              data-item-description={activeVariant.label}
              data-item-image={activeVariantFile.preview_url}
              data-item-name={name}
            >
              Køb {name}
            </button>
          </Column>
        </Row>
      </Section>
      <Logorow />
      <Section>
        <Row>
          <Column>
            <h2>Produkt&shy;information</h2>
            <p>{product.description}</p>
            <h3>Materiale</h3>
            <p>{product.material}</p>
          </Column>
          <Column>
            <Card
              title={`Udforsk ${product.collection} kollektionen`}
              href={`/kollektioner/${product.collection}`}
            />
            <Link href="/kollektioner" style={{ alignSelf: 'end' }}>
              Udforsk alle kollektioner
            </Link>
          </Column>
        </Row>
      </Section>
      <Logorow />
      <Section>
        <Column>
          <h2>Relaterede produkter</h2>
          <ProductGrid products={relatedProducts} />
          <Link href="/produkter" style={{ alignSelf: 'end' }}>
            Udforsk alle produkter
          </Link>
        </Column>
      </Section>
    </>
  );
}
