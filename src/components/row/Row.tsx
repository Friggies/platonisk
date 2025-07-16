import styles from './Row.module.scss';

export default function Row({ children }) {
  return <div className={styles.row}>{children}</div>;
}
