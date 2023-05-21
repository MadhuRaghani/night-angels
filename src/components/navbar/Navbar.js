import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import "../navbar/Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navigation container">
        <div className="nav-brand">
          <Link className="link" to="/">
            NightAngels
          </Link>
        </div>

        <div className="nav-explore">
          <input type="text" placeholder="Search" />
          <Link className="link" to="/productlists">
            Explore
          </Link>
          <Link className="link" to="/">
            <AiOutlineUser size={28} />
          </Link>
          <Link className="link" href="/wishlist">
            <AiOutlineHeart size={28} />
          </Link>
          <Link className="link" href="/cart">
            <AiOutlineShoppingCart size={28} />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
