import Link from 'next/link';
import styles from './Card.module.scss';
import Image from 'next/image';

export default function Card({ href, title }) {
  return (
    <Link href={href} className={styles.card}>
      <Image
        className={styles.image}
        src={href}
        width="100"
        height="300"
        alt={title}
      />
      <div className={styles.title}>{title}</div>
    </Link>
  );
}
