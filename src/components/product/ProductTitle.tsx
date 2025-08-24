import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import useWishlistState from '../../hooks/useWishlistState';
import useWishlistDispatch from '../../hooks/useWishlistDispatch';
import styles from './ProductTitle.module.scss';

export default function ProductTitle({ product }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();
  const onWishlist = isSaved(product.id);

  const handleWishlistClick = () => addItem(product);

  if (!mounted) return <h1>{product.name}</h1>;

  return (
    <h1 className={styles.title}>
      {product.name}
      <button
        onClick={handleWishlistClick}
        aria-label={
          onWishlist ? 'Fjern fra ønskeliste' : 'Tilføj til ønskeliste'
        }
      >
        <Heart
          size={30}
          stroke={onWishlist ? '#e61937' : 'currentColor'}
          fill={onWishlist ? '#e61937' : 'none'}
        />
      </button>
    </h1>
  );
}
