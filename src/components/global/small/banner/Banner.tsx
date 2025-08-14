import { ReactElement } from 'react';
import styles from './Banner.module.scss';

export default function Banner({ children }: { children: ReactElement }) {
  return <div className={styles.banner}>{children}</div>;
}
