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
    <>
      <header
        className={
          scrolled ? `${styles.header} ${styles.scrolled}` : styles.header
        }
      >
        <Link className={styles.title} href="/">
          Platonisk
        </Link>
        <nav className={styles.navigation}>
          <Link
            className={styles.icon}
            href="/produkter"
            aria-label="Søg efter produkter"
          >
            <Search />
          </Link>
          <>
            <Link
              className={styles.icon}
              href="/onskeliste"
              aria-label="Ønskeliste"
            >
              {mounted && hasItems && <span />}
              <Heart />
            </Link>
            <button
              className={`snipcart-checkout ${styles.icon}`}
              aria-label="Kurv"
            >
              {cartHasItems && <span />}
              <ShoppingBasket />
            </button>
            <button
              className={styles.icon}
              aria-label="Menu"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </button>
          </>
        </nav>
      </header>
    </>
  );
}
