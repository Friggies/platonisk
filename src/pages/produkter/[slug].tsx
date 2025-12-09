import { GetStaticPaths, GetStaticProps } from 'next';
import ProductVariantPicker from '../../components/product/ProductVariantPicker';
import useWishlistState from '../../hooks/useWishlistState';
import useWishlistDispatch from '../../hooks/useWishlistDispatch';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../lib/get-all-products';
import localProducts from '../../data/products.json';
import reviews from '../../data/reviews.json';
import Section from '../../components/global/small/section/Section';
import Row from '../../components/global/small/row/Row';
import Column from '../../components/global/small/column/Column';
import ProductImage from '../../components/product/ProductImage';
import Logorow from '../../components/global/small/logorow/Logorow';
import Card from '../../components/global/small/card/Card';
import Link from 'next/link';
import ProductGrid from '../../components/product/ProductGrid';
import ProductStars from '../../components/product/ProductStars';
import ProductTags from '../../components/product/ProductTags';
import ProductTitle from '../../components/product/ProductTitle';

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
    props: { products, product },
  };
};

export default function ProductPage({ products, product }) {
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

  const relatedProducts = products
    .filter(
      (p) =>
        p.external_id !== product.external_id &&
        p.collection === product.collection
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const ratings = reviews.filter(
    (review) => review.external_id === product.external_id
  );

  const rating = ratings.reduce(
    (acc, review, _, arr) => acc + review.rating / arr.length,
    0
  );

  return (
    <>
      <Section>
        <Row>
          <Column>
            <ProductImage src={product.thumbnail_url} />
          </Column>
          <Column>
            <ProductTitle product={product} />
            {rating ? (
              <div>
                <ProductStars rating={rating} />
                <p>
                  {rating}/5{' '}
                  <Link href="#ratings">
                    ({ratings.length}
                    {ratings.length !== 1
                      ? ' verificerede anmeldelser'
                      : ' verificeret anmeldelse'}
                    )
                  </Link>
                </p>
              </div>
            ) : (
              ''
            )}
            <p>
              <strong>{formattedPrice}</strong>
            </p>
            <ProductTags product={product} />
            <ProductVariantPicker
              value={activeVariantExternalId}
              onChange={({ target: { value } }) =>
                setActiveVariantExternalId(value)
              }
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
            <h3>Pasform</h3>
            <p>{product.fit} fit</p>
            <h3>Materiale</h3>
            <p>{product.material}</p>
          </Column>
          <Column>
            <Card
              title={`${product.collection}`}
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
