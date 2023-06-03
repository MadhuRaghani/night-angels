import React, { useContext } from "react";
import { WishlistContext } from "../../contexts/WishlistContext";
import ProductCard from "../products/ProductCard";
import "../wishlist/Wishlist.css";

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="all-products-div">
      {wishlist.map((eachProduct) => (
        <ProductCard product={eachProduct} key={eachProduct._id} />
      ))}
    </div>
  );
}

export default Wishlist;
