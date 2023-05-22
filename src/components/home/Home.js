import React, { useEffect, useState } from "react";
import "../home/Home.css";
import axios from "axios";
import CategoryCard from "./CategoryCard";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/categories", {});
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
        // console.log(response, response.data.categories);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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
