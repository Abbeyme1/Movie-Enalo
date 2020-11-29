import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { WishListReducer } from "./reducers/wishlistReducer";

// wishlist will be called as state  action is calling wishlist from reducer
const reducer = combineReducers({
  wishlist: WishListReducer,
});

const movieWishList = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [];

// from reducer we had it in here  // i cnt write just wishlist: []

// wishlist: [...state.wishlist, movie], movie is addded here in this state
const initialState = {
  wishlist: {
    wishlist: movieWishList,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
