import React, { useContext } from "react";
import "../home/Home.css";
import CategoryCard from "./CategoryCard";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { categories, filtersDispatch } = useContext(ProductsContext);
  const navigate = useNavigate();

  return (
    <div className="home">
      <header>
        <img
          className="hero-img"
          src="https://julietindia.com/cdn/shop/collections/INSIDE_BANNER_nightwear_1.png"
          alt="hero"
          onClick={() => {
            filtersDispatch({ type: "CLEAR_FILTERS" });
            navigate("/productlists");
          }}
        />
      </header>
      <h3>Featured Categories</h3>
      <div className="all-categories">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => {
              filtersDispatch({ type: "CLEAR_FILTERS" });
              filtersDispatch({
                type: "CATEGORIES",
                payload: category.categoryName,
              });
              navigate("/productlists");
            }}
          >
            <CategoryCard key={category._id} categoryDetails={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
