import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header} id="header">
      <Link href="/">Platonisk</Link>
    </header>
  );
}
