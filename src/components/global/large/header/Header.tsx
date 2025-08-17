import Link from 'next/link';
import styles from './Header.module.scss';
import useWishlistState from '../../../../hooks/useWishlistState';
import useSnipcartCount from '../../../../hooks/useSnipcartCount';
import {
  Heart,
  Menu as MenuIcon,
  Search,
  ShoppingBasket,
  XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { PrintfulProduct } from '../../../../types';
import ProductGrid from '../../../product/ProductGrid';

interface HeaderProps {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  products: PrintfulProduct[];
}

export default function Header({
  isMenuOpen,
  setMenuOpen,
  products,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');

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

  const searchedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    .splice(0, 3);

  return (
    <>
      <header
        className={
          scrolled ? `${styles.header} ${styles.scrolled}` : styles.header
        }
      >
        {!searching && (
          <Link className={styles.title} href="/">
            Platonisk
          </Link>
        )}
        <nav className={styles.navigation}>
          {searching && (
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.search}
              autoFocus
              placeholder="Søg efter produkter her..."
            />
          )}
          <button
            className={styles.icon}
            aria-label="Søg"
            onClick={() => {
              setSearching((prev) => !prev);
            }}
          >
            {!searching ? <Search /> : <XIcon />}
          </button>
          {!searching && (
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
          )}
        </nav>
      </header>
      {searching && (
        <div className={styles.searchResults}>
          <ProductGrid products={searchedProducts} />
        </div>
      )}
    </>
  );
}
