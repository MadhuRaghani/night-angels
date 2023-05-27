import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

function Filters({ categories, sizes, stars }) {
  const {
    filtersDispatch,
    sortFilters,
    priceFilters,
    sizesFilters,
    categoriesFilters,
    starsFilters,
  } = useContext(ProductsContext);

  return (
    <div className="filters">
      <div className="filters-clear-div">
        <p className="filters-p">Filters</p>
        <p
          className="clear-filters cursor-pointer"
          onClick={() => {
            filtersDispatch({ type: "CLEAR_FILTERS" });
          }}
        >
          Clear
        </p>
      </div>
      <div className="filters-sorting-div">
        <p className="filters-p">Sort</p>
        <div className="each-checkbox-and-p-div">
          <input
            type="radio"
            name="sorting-radio-btn"
            className="cursor-pointer"
            value="HIGH_TO_LOW"
            onChange={(event) => {
              filtersDispatch({ type: "SORT", payload: event.target.value });
            }}
            checked={sortFilters === "HIGH_TO_LOW"}
          />
          <p>Price High To Low</p>
        </div>
        <div className="each-checkbox-and-p-div">
          <input
            type="radio"
            name="sorting-radio-btn"
            className="cursor-pointer"
            value="LOW_TO_HIGH"
            onChange={(event) => {
              filtersDispatch({ type: "SORT", payload: event.target.value });
            }}
            checked={sortFilters === "LOW_TO_HIGH"}
          />
          <p>Price Low To High</p>
        </div>
      </div>
      <div className="filters-price-div">
        <p className="filters-p">Price</p>
        <div className="price-range-labels">
          <p>0</p>
          <p>1399</p>
          <p>2799</p>
        </div>
        <input
          type="range"
          min="0"
          max="2799"
          value={priceFilters}
          className="cursor-pointer"
          onChange={(event) =>
            filtersDispatch({ type: "PRICE", payload: event.target.value })
          }
        />
      </div>
      <div className="filters-categories-div">
        <p className="filters-p">Categories</p>
        {categories.map((category) => (
          <div className="each-checkbox-and-p-div" key={category._id}>
            <input
              type="checkbox"
              className="cursor-pointer"
              value={category.categoryName}
              onChange={(event) => {
                filtersDispatch({
                  type: "CATEGORIES",
                  payload: event.target.value,
                });
              }}
              checked={categoriesFilters.includes(category.categoryName)}
            />
            <p>{category.categoryName}</p>
          </div>
        ))}
      </div>
      <div className="filters-sizes-div">
        <p className="filters-p">Sizes</p>
        {sizes.map((size) => (
          <div className="each-checkbox-and-p-div" key={size}>
            <input
              type="checkbox"
              className="cursor-pointer"
              value={size}
              onChange={(event) => {
                filtersDispatch({
                  type: "SIZES",
                  payload: event.target.value,
                });
              }}
              checked={sizesFilters.includes(size)}
            />
            <p>{size}</p>
          </div>
        ))}
      </div>
      <div className="filters-stars-div">
        <p className="filters-p">Stars</p>
        {stars.map((star) => (
          <div className="each-checkbox-and-p-div" key={star}>
            <input
              type="radio"
              name="rating-radio-btn"
              className="cursor-pointer"
              value={star}
              onChange={(event) => {
                filtersDispatch({ type: "STARS", payload: event.target.value });
              }}
              checked={parseInt(starsFilters) === star}
            />
            <p>{star} stars & above</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
