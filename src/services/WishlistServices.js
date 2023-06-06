import axios from "axios";
import { toast } from "react-toastify";

export const addToWishlistHandler = async (
  product,
  token,
  setWishlist,
  setDisableAddRemoveWishlistBtn
) => {
  setDisableAddRemoveWishlistBtn(true);
  try {
    const response = await axios.post(
      "/api/user/wishlist",
      { product },
      { headers: { authorization: token } }
    );
    if (response.status === 201) {
      setWishlist(response.data.wishlist);
      toast.success("Added to Wishlist");
    }
  } catch (err) {
    console.error("Error in Wishlist", err);
  } finally {
    setDisableAddRemoveWishlistBtn(false);
  }
};

export const removeFromWishlistHandler = async (
  productId,
  token,
  setWishlist,
  setDisableAddRemoveWishlistBtn
) => {
  setDisableAddRemoveWishlistBtn(true);
  try {
    const response = await axios.delete("/api/user/wishlist/" + productId, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      setWishlist(response.data.wishlist);
      toast.warning("Removed From Wishlist");
    }
  } catch (err) {
    console.error("Error in Wishlist", err);
  } finally {
    setDisableAddRemoveWishlistBtn(false);
  }
};
