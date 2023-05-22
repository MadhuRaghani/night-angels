import React, { useContext } from "react";
import "../products/ProductListing.css";
import Filters from "./Filters";
import Products from "./Products";
import { ProductsContext } from "../../contexts/ProductsContext";

function ProductListing() {
  const { categories, products } = useContext(ProductsContext);
  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
  const stars = [4, 3, 2, 1];

  return (
    <div className="product-listing-page">
      <Filters categories={categories} sizes={sizes} stars={stars} />
      <Products products={products} />
    </div>
  );
}

export default ProductListing;
