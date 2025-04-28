import { ChevronDown } from 'lucide-react';
import styles from './ProductVariantPicker.module.scss';

const ProductVariantPicker = ({ variants, ...props }) => {
  if (!variants || variants.length <= 1)
    return (
      <div className={styles.selectWrapper}>
        <div className={styles.select}>Størrelsesløs</div>
      </div>
    );

  return (
    <div className={styles.selectWrapper}>
      <select {...props} className={styles.select}>
        {variants.map(({ external_id, label, availability_status }) => (
          <option
            key={external_id}
            value={external_id}
            disabled={availability_status !== 'active'}
          >
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className={styles.icon} size={18} />
    </div>
  );
};

export default ProductVariantPicker;
