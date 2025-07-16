import styles from './ProductImage.module.scss';
import Image from 'next/image';

export default function ProductImage({ src, title = '' }) {
  return (
    <Image
      className={styles.image}
      src={src}
      width="320"
      height="320"
      alt={title}
    />
  );
}
