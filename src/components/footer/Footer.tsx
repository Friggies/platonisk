import Link from "next/link";
import styles from "./Footer.module.scss";
import { Handshake, Mail, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
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
      </nav>
    </footer>
  );
}
