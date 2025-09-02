import styles from './searchContainer.module.scss';

export default function SearchContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
