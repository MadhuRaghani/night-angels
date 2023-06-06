import React from "react";
import ProductCard from "./ProductCard";

function Products({ products }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div className="all-products-div">
        {products.map((eachProduct) => (
          <ProductCard product={eachProduct} key={eachProduct._id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
