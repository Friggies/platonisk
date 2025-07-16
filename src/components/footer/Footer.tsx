import Link from 'next/link';
import styles from './Footer.module.scss';
import {
  Handshake,
  HelpCircle,
  Instagram,
  Mail,
  MessageCircleQuestion,
  Truck,
} from 'lucide-react';
import Logorow from '../logorow/Logorow';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logorow />
      <nav className={styles.nav}>
        <Link href="https://instagram.com/platonisk.dk" target="_blank">
          <Instagram />
          Instagram
        </Link>
        <Link href="/levering">
          <Truck />
          Levering
        </Link>
        <Link href="/handelsbetingelser">
          <Handshake />
          Handelsbetingelser
        </Link>
        <Link href="/kontakt">
          <Mail />
          Kontakt
        </Link>
        <Link href="/hjalp">
          <MessageCircleQuestion strokeWidth="1" size="30" />
          Hjælp
        </Link>
      </nav>
    </footer>
  );
}
