import Link from 'next/link';
import useWishlistState from '../../hooks/useWishlistState';
import useSnipcartCount from '../../hooks/useSnipcartCount';
import styles from './Navigation.module.scss';
import { ArrowUp, Heart, ShoppingBasket, Pause, Play } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { toggleAnimations } from '../../store/animationSlice';

export default function Navigation() {
  const { hasItems } = useWishlistState();
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  const animationsActive = useSelector(
    (state: RootState) => state.animation.animationsActive
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleAnimation = () => {
    dispatch(toggleAnimations());
  };

  return (
    <nav className={styles.nav}>
      <Link href="#header" aria-label="Go to the top">
        <ArrowUp />
      </Link>
      <button
        onClick={handleToggleAnimation}
        aria-label="Toggle Animation"
        className={styles.animationToggle}
      >
        {animationsActive ? <Pause /> : <Play />}
      </button>
      <Link href="/onskeliste" aria-label="Ønskeliste">
        {hasItems && <span />}
        <Heart />
      </Link>
      <button className="snipcart-checkout" aria-label="Cart">
        {cartHasItems && <span />}
        <ShoppingBasket />
      </button>
    </nav>
  );
}
