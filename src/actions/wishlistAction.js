import * as constants from "../constants/wishlistConstants";

export const addToWishlist = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.ADD_TO_WISHLIST,
      payload: id,
    });

    localStorage.setItem(
      "wishlist",
      JSON.stringify(getState().wishlist.wishlist),
    );
  };
};

export const removeFromWishList = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.REMOVE_FROM_WISHLIST,
      payload: id,
    });
    localStorage.setItem(
      "wishlist",
      JSON.stringify(getState().wishlist.wishlist),
    );
  };
};
