import ProductCard from './ProductCard';
import styles from './ProductGrid.module.scss';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
