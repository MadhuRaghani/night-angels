import React, { useContext } from "react";
// import WishlistProductCard from "./WishlistProductCard";
import { WishlistContext } from "../../contexts/WishlistContext";
import "../wishlist/Wishlist.css";
import ProductCard from "../products/ProductCard";

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
      <div>
        <h2>My Wishlist({wishlist.length})</h2>
      </div>
      <div className="all-products-div">
        {wishlist.map((eachProduct) => (
          <ProductCard product={eachProduct} key={eachProduct._id} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
