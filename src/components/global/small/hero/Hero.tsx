import styles from './Hero.module.scss';

export default function Hero({ children }) {
  return <div className={styles.hero}>{children}</div>;
}
