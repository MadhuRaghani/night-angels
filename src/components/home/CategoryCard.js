import React from "react";

function CategoryCard({ categoryDetails: { _id, categoryName, image } }) {
  return (
    <div className="category-card zoom" key={_id}>
      <img src={image} alt={categoryName} />
      <h4>{categoryName}</h4>
    </div>
  );
}

export default CategoryCard;
