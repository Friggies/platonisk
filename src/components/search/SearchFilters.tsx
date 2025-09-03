import styles from './SearchFilters.module.scss';

export default function SearchFilters({ children }) {
  return <div className={styles.filters}>{children}</div>;
}
