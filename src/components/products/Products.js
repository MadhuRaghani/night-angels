import React from "react";
import ProductCard from "./ProductCard";

function Products({ products }) {
  console.log(products, products.length);
  return products.length > 0 ? (
    <div className="all-products-div">
      {products.map((eachProduct) => (
        <ProductCard product={eachProduct} key={eachProduct._id} />
      ))}
    </div>
  ) : (
    <div className="no-products-found-div">
      <h2>No products Found Matching Criteria</h2>
    </div>
  );
}

export default Products;
