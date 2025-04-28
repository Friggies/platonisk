import { useState } from 'react';
import ProductImage from './ProductImage';
import useWishlistDispatch from '../../hooks/useWishlistDispatch';
import useWishlistState from '../../hooks/useWishlistState';
import ProductVariantPicker from './ProductVariantPicker';
import { Heart, MoveDownLeft } from 'lucide-react';
import styles from './ProductCard.module.scss';

const ProductCard = (product) => {
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
    <article className={styles.card}>
      <button
        className={styles.wishlist}
        aria-label="Add to wishlist"
        onClick={addToWishlist}
      >
        {onWishlist ? <Heart fill="#fb2c36" /> : <Heart />}
      </button>
      {activeVariantFile && (
        <ProductImage
          src={activeVariantFile.preview_url}
          alt={`${activeVariant.label} ${name}`}
          title={`${activeVariant.label} ${name}`}
          width={250}
          height={250}
        />
      )}
      <div>
        <h2 className={styles.title}>{name}</h2>
        <p>{formattedPrice}</p>
      </div>
      <ProductVariantPicker
        value={activeVariantExternalId}
        onChange={({ target: { value } }) => setActiveVariantExternalId(value)}
        variants={variants}
        disabled={oneStyle}
      />
      <button
        className={`${styles.button} snipcart-add-item`}
        data-item-id={activeVariantExternalId}
        data-item-price={activeVariant.retail_price}
        data-item-url={`/api/products/${activeVariantExternalId}`}
        data-item-description={activeVariant.label}
        data-item-image={activeVariantFile.preview_url}
        data-item-name={name}
      >
        Bestil
      </button>
      <MoveDownLeft size="32" className={styles.mobileIcon} />
    </article>
  );
};

export default ProductCard;
