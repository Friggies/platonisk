import { LeafIcon, PenToolIcon, RulerIcon, TruckIcon } from 'lucide-react';
import GenderIcon from './ProductGenderIcon';
import styles from './ProductTags.module.scss';
import Image from 'next/image';

export default function ProductTags({ product }) {
  return (
    <ul className={styles.tags}>
      <li>
        <RulerIcon size={14} />
        {`${product.fit} fit`}
      </li>
      <li>
        <LeafIcon size={14} />
        {`${product.material}`}
      </li>
      <li>
        <GenderIcon gender={product.gender} />
      </li>
      <li>
        <span>
          <PenToolIcon size={14} />
          Dansk design
        </span>
        <Image
          src="/flags/dk.webp"
          width={474}
          height={315}
          alt="Det danske flag Dannebrog"
        />
      </li>
    </ul>
  );
}
