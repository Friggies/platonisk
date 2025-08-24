import useWishlistDispatch from '../../hooks/useWishlistDispatch';
import useWishlistState from '../../hooks/useWishlistState';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProductCard = (product) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();
  const { id, name, variants } = product;
  const [firstVariant] = variants;

  const activeVariant = variants.find(
    (v) => v.external_id === firstVariant.external_id
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
    <div className={styles.card}>
      <Link className={styles.link} href={`/produkter/${product.slug}`}>
        {activeVariantFile && (
          <Image
            src={activeVariantFile.preview_url}
            alt={`${activeVariant.label} ${name}`}
            width="250"
            height="250"
            className={styles.image}
          />
        )}
        <h2 className={styles.title}>{name}</h2>
        <p>{formattedPrice}</p>
      </Link>
      <button
        className={styles.wishlist}
        aria-label="Add to wishlist"
        onClick={addToWishlist}
      >
        {mounted && onWishlist ? (
          <Heart fill="#e61937" color="#e61937" />
        ) : (
          <Heart />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
