import React, { useContext } from "react";
import "../home/Home.css";
import CategoryCard from "./CategoryCard";
import { ProductsContext } from "../../contexts/ProductsContext";

function Home() {
  const { categories } = useContext(ProductsContext);

  return (
    <div className="home">
      <header>
        <img
          className="hero-img"
          src="https://julietindia.com/wp-content/uploads/2023/01/3.webp"
          alt="hero"
        />
      </header>
      <h3>Featured Categories</h3>
      <div className="all-categories">
        {categories.map((category) => (
          <CategoryCard key={category._id} categoryDetails={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;
