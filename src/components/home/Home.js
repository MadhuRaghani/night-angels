import React, { useEffect } from "react";
import "../home/Home.css";
import axios from "axios";

function Home() {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios("");
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
      <h2>Featured Categories</h2>
    </div>
  );
}

export default Home;
