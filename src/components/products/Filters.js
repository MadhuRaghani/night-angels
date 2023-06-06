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
          <label className="cursor-pointer">
            <input
              type="radio"
              className="cursor-pointer"
              name="sorting-radio-btn"
              value="HIGH_TO_LOW"
              onChange={(event) => {
                filtersDispatch({ type: "SORT", payload: event.target.value });
              }}
              checked={sortFilters === "HIGH_TO_LOW"}
            />
            Price High To Low
          </label>
        </div>
        <div className="each-checkbox-and-p-div">
          <label className="cursor-pointer">
            <input
              type="radio"
              className="cursor-pointer"
              name="sorting-radio-btn"
              value="LOW_TO_HIGH"
              onChange={(event) => {
                filtersDispatch({ type: "SORT", payload: event.target.value });
              }}
              checked={sortFilters === "LOW_TO_HIGH"}
            />
            Price Low To High
          </label>
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
            <label className="cursor-pointer">
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
              {category.categoryName}
            </label>
          </div>
        ))}
      </div>
      <div className="filters-sizes-div">
        <p className="filters-p">Sizes</p>
        {sizes.map((size) => (
          <div className="each-checkbox-and-p-div" key={size}>
            <label className="cursor-pointer">
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
              {size}
            </label>
          </div>
        ))}
      </div>
      <div className="filters-stars-div">
        <p className="filters-p">Stars</p>
        {stars.map((star) => (
          <div className="each-checkbox-and-p-div" key={star}>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="rating-radio-btn"
                className="cursor-pointer"
                value={star}
                onChange={(event) => {
                  filtersDispatch({
                    type: "STARS",
                    payload: event.target.value,
                  });
                }}
                checked={parseInt(starsFilters) === star}
              />
              {star} stars & above
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
