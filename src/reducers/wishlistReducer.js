import * as constants from "../constants/wishlistConstants";

export const WishListReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case constants.ADD_TO_WISHLIST:
      const movie = action.payload;

      return {
        wishlist: [...state.wishlist, movie],
      };

    case constants.REMOVE_FROM_WISHLIST:
      return {
        wishlist: state.wishlist.filter((x) => x !== action.payload),
      };

    default:
      return state;
  }
};
