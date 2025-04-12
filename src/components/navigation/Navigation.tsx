import Link from "next/link";
import useWishlistState from "../../hooks/useWishlistState";
import useSnipcartCount from "../../hooks/useSnipcartCount";
import styles from "./Navigation.module.scss";
import {
  ArrowUp,
  Heart,
  Instagram,
  ShoppingBasket,
  Pause,
  Play,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleAnimations } from "../../store/animationSlice";

export default function Navigation() {
  const { hasItems } = useWishlistState();
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  const animationsActive = useSelector(
    (state: RootState) => state.animation.animationsActive
  );
  const dispatch = useDispatch();

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
      <Link
        href="http://instagram.com/platonisk.dk"
        target="_blank"
        aria-label="Instagram"
      >
        <Instagram />
      </Link>
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
