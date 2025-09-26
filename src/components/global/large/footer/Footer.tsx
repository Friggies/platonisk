import Link from 'next/link';
import styles from './Footer.module.scss';
import Logorow from '../../small/logorow/Logorow';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logorow />
      <nav className={styles.nav}>
        <Link className={styles.title} href="/">
          Platonisk
        </Link>
        <ul className={styles.list}>
          <li>
            <Link href="/levering">Levering</Link>
          </li>

          <li>
            <Link href="/kontakt">Kontakt os</Link>
          </li>
          <li>
            <Link href="/hjalp">Hjælp & FAQ</Link>
          </li>
          <li>
            <Link href="/privatlivspolitik">Privatlivspolitik</Link>
          </li>
          <li>
            <Link href="/handelsbetingelser">Handelsbetingelser</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
