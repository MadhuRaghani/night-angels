import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  // AiOutlineSearch,
} from "react-icons/ai";
import "../navbar/Navbar.css";
import { ProductsContext } from "../../contexts/ProductsContext";

function Navbar() {
  const { filtersDispatch } = useContext(ProductsContext);

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
              onChange={(event) => {
                filtersDispatch({
                  type: "SEARCH",
                  payload: event.target.value,
                });
              }}
            />
          </label>
        </div>
        <div className="nav-right">
          <Link className="link" to="/productlists">
            Explore
          </Link>
          <Link className="link" to="/user">
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
