import useWishlistState from "../hooks/useWishlistState";

import ProductGrid from "../components/product/ProductGrid";
import Link from "next/link";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  const { hasItems, items } = useWishlistState();

  return (
    <>
      <h1>Ønskeliste</h1>
      {hasItems ? (
        <ProductGrid products={items} />
      ) : (
        <>
          <p>
            Tilføj produkter til din ønskeliste ved at trykke på{" "}
            <Heart color="#fb2c36" size="16" /> ikonet.
          </p>
          <Link href="/" className="link">
            Gå til boutique
          </Link>
        </>
      )}
    </>
  );
};

export default WishlistPage;
