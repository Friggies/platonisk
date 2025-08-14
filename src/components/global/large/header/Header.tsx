import Link from 'next/link';
import styles from './Header.module.scss';
import useWishlistState from '../../../../hooks/useWishlistState';
import useSnipcartCount from '../../../../hooks/useSnipcartCount';
import { Heart, Menu as MenuIcon, Search, ShoppingBasket } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setMenuOpen }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { hasItems } = useWishlistState();
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  return (
    <header
      className={
        scrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
      <Link className={styles.title} href="/">
        Platonisk
      </Link>
      <nav className={styles.navigation}>
        <button className={styles.icon} aria-label="Søg">
          <Search size={30} />
        </button>
        <Link
          className={styles.icon}
          href="/onskeliste"
          aria-label="Ønskeliste"
        >
          {mounted && hasItems && <span />}
          <Heart size={30} />
        </Link>
        <button
          className={`snipcart-checkout ${styles.icon}`}
          aria-label="Kurv"
        >
          {cartHasItems && <span />}
          <ShoppingBasket size={30} />
        </button>
        <button
          className={styles.icon}
          aria-label="Menu"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <MenuIcon size={30} />
        </button>
      </nav>
    </header>
  );
}
