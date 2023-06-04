// import './ProductCard.css';
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineStar,
  AiFillHeart,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import {
  addToWishlistHandler,
  removeFromWishlistHandler,
} from "../../services/WishlistServices";
import { addToCartHanler } from "../../services/CartServices";

const ProductCard = ({ product }) => {
  // const navigate = useNavigate();
  // const [cartbuttonDisabled, setcartDisable] = useState(false);
  // const [wishButtonDisabled, setWishDisable] = useState(false);
  const {
    _id,
    title,
    // description,
    original_price,
    price,
    brand,
    rating,
    size,
    image,
    // category,
    // fabric,
    // color,
    new_arrivals,
    reviews,
    in_stock,
  } = product;
  // const { token } = useAuth();
  // const location = useLocation();

  const discount = Math.floor(
    ((original_price - price) / original_price) * 100
  );

  const { isLoggedIn, token } = useContext(AuthContext);
  const { cart, setCart, disableAddToCartBtn, setDisableAddToCartBtn } =
    useContext(CartContext);
  const {
    wishlist,
    setWishlist,
    disableAddRemoveWishlistBtn,
    setDisableAddRemoveWishlistBtn,
  } = useContext(WishlistContext);

  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="image-card-div">
        {new_arrivals && (
          <div className="new-arrivals-div">
            <span>New Arrivals</span>
          </div>
        )}
        <div className="size-div">{size}</div>
        <div className="ratings-reviews-div">
          <span className="ratings-reviews-span">
            <AiOutlineStar size={14} />
            {rating} | {reviews}
          </span>
        </div>
        <div className="image-div">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="product-details-card-div">
        <div className="title-div">
          <p className="product-brand">{brand}</p>
          <p className="product-title">{title}</p>
        </div>
        <div className="price-and-discount-div">
          <div className="price-div">
            <span className="product-price">₹{price}</span>
            <span className="product-original-price">₹{original_price}</span>
          </div>
          <span className="product-discount">({discount}% OFF)</span>
        </div>
      </div>
      <div className="add-to-cart-btn-div">
        {in_stock ? (
          <button
            className="add-to-cart-btn cursor-pointer"
            disabled={disableAddToCartBtn}
            onClick={() => {
              if (isLoggedIn) {
                cart?.find(({ _id: toFindId }) => _id === toFindId)
                  ? navigate("/cart")
                  : addToCartHanler(
                      product,
                      token,
                      setCart,
                      setDisableAddToCartBtn
                    );
              } else {
                navigate("/login");
              }
            }}
          >
            {cart?.find(({ _id: toFindId }) => _id === toFindId) ? (
              <>
                Go To Cart <AiOutlineArrowRight size={14} />
              </>
            ) : (
              <>
                <AiOutlineShoppingCart size={14} /> Add To Cart
              </>
            )}
          </button>
        ) : (
          <span className="out-of-stock-label">Out Of Stock</span>
        )}
        <button
          className="add-to-wishlist-btn cursor-pointer"
          disabled={disableAddRemoveWishlistBtn}
          onClick={() => {
            if (isLoggedIn) {
              wishlist?.find(({ _id: toFindId }) => toFindId === _id)
                ? removeFromWishlistHandler(
                    _id,
                    token,
                    setWishlist,
                    setDisableAddRemoveWishlistBtn
                  )
                : addToWishlistHandler(
                    product,
                    token,
                    setWishlist,
                    setDisableAddRemoveWishlistBtn
                  );
            } else {
              navigate("/login");
            }
          }}
        >
          {wishlist?.find(({ _id: toFindId }) => toFindId === _id) ? (
            <AiFillHeart size={42} color="#813772" />
          ) : (
            <AiOutlineHeart size={42} color="#813772" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
