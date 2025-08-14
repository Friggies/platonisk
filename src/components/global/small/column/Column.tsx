import styles from './Column.module.scss';

export default function Column({ children }) {
  return <div className={styles.column}>{children}</div>;
}
