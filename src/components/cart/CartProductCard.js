import { useContext } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import {
  addToWishlistHandler,
  removeFromWishlistHandler,
} from "../../services/WishlistServices";
import {
  incrementDecrementHandler,
  removeFromCartHandler,
} from "../../services/CartServices";
import { toast } from "react-toastify";

const CartProductCard = ({ product }) => {
  const { _id, title, original_price, price, brand, image, size, qty } =
    product;

  const discount = Math.floor(
    ((original_price - price) / original_price) * 100
  );

  const { isLoggedIn, token } = useContext(AuthContext);
  const { setCart, disableAddToCartBtn, setDisableAddToCartBtn } =
    useContext(CartContext);
  const {
    wishlist,
    setWishlist,
    disableAddRemoveWishlistBtn,
    setDisableAddRemoveWishlistBtn,
  } = useContext(WishlistContext);

  const navigate = useNavigate();

  return (
    <div className="product-card-cart">
      <div className="image-card-div-cart">
        <div className="selected-size-div-cart">{size}</div>
        <div className="product-card-wishlist-div">
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
              <AiFillHeart size={28} color="#813772" />
            ) : (
              <AiOutlineHeart size={28} color="#813772" />
            )}
          </button>
        </div>
        <div className="image-div-cart">
          <img src={image} alt={title} />{" "}
        </div>
      </div>
      <div className="product-details-card-div-cart">
        <div className="product-details-card-div">
          <div className="title-div">
            <p className="product-brand">{brand}</p>
          </div>
          <div className="price-and-discount-div">
            <div className="price-div">
              <span className="product-price">₹{price}</span>
              <span className="product-original-price">₹{original_price}</span>
            </div>
            <div>
              <span className="product-discount">({discount}% OFF)</span>
            </div>
          </div>
        </div>
        <div className="quantity-and-remove-from-cart-div">
          <div className="quantity-div">
            <div>Quantity:</div>
            <div className="quantities-div">
              <button
                disabled={disableAddToCartBtn}
                className="cursor-pointer"
                onClick={() => {
                  qty > 1
                    ? incrementDecrementHandler(
                        _id,
                        "decrement",
                        token,
                        setCart,
                        setDisableAddToCartBtn
                      )
                    : toast.error("Cannot Decrement");
                }}
              >
                <AiOutlineMinusCircle size={21} color="#813772" />
              </button>
              <span>{qty}</span>
              <button
                className="cursor-pointer"
                disabled={disableAddToCartBtn}
                onClick={() => {
                  incrementDecrementHandler(
                    _id,
                    "increment",
                    token,
                    setCart,
                    setDisableAddToCartBtn
                  );
                }}
              >
                <AiOutlinePlusCircle size={21} color="#813772" />
              </button>
            </div>
          </div>
          <div className="add-to-cart-btn-div">
            <button
              className="remove-from-cart-btn cursor-pointer"
              disabled={disableAddToCartBtn}
              onClick={() => {
                if (isLoggedIn) {
                  removeFromCartHandler(
                    _id,
                    token,
                    setCart,
                    setDisableAddToCartBtn
                  );
                } else {
                  navigate("/login");
                }
              }}
            >
              REMOVE
            </button>
          </div>
          <div className="add-to-cart-btn-div">
            <button
              className="remove-from-cart-btn cursor-pointer"
              disabled={disableAddToCartBtn}
              onClick={() => {
                if (isLoggedIn) {
                  wishlist?.find(({ _id: toFindId }) => toFindId === _id)
                    ? toast.warning("Alreaddy in Wishlist")
                    : addToWishlistHandler(
                        product,
                        token,
                        setWishlist,
                        setDisableAddRemoveWishlistBtn
                      );
                  removeFromCartHandler(
                    _id,
                    token,
                    setCart,
                    setDisableAddToCartBtn
                  );
                } else {
                  navigate("/login");
                }
              }}
            >
              <AiOutlineArrowLeft /> MOVE TO WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
