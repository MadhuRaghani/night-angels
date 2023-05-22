import React from "react";
import ProductCard from "./ProductCard";

function Products({ products }) {
  return (
    <div className="all-products-div">
      {products.map((eachProduct) => (
        <ProductCard product={eachProduct} key={eachProduct._id} />
      ))}
    </div>
  );
}

export default Products;
