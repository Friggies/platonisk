import styles from './SearchFilters.module.scss';

export default function SearchFilters({ children, showFilters }) {
  return (
    <div className={`${styles.filters} ${showFilters && styles.show}`}>
      {children}
    </div>
  );
}
