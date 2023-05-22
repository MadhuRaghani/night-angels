import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  // AiOutlineSearch,
} from "react-icons/ai";
import "../navbar/Navbar.css";

function Navbar() {
  return (
    <div className="nav-bar">
      <nav className="nav-full">
        <div className="nav-left">
          <Link className="link app-name" to="/">
            NightAngels
          </Link>
        </div>
        <div className="nav-center">
          <label>
            <input
              type="text"
              placeholder="Search"
              className="nav-search-input"
            />
          </label>
        </div>
        <div className="nav-right">
          <Link className="link" to="/productlists">
            Explore
          </Link>
          <Link className="link" to="/">
            <AiOutlineUser size={28} />
          </Link>
          <Link className="link" to="/wishlist">
            <AiOutlineHeart size={28} />
          </Link>
          <Link className="link" to="/cart">
            <AiOutlineShoppingCart size={28} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
