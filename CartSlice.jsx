import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const existing = state.cartItems.find((item) => item.id === plant.id);
      if (existing) existing.quantity += 1;
      else state.cartItems.push({ ...plant, quantity: 1 });
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cartItems.find((plant) => plant.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const item = state.cartItems.find((plant) => plant.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartItemCount = (state) =>
  state.cart.cartItems.reduce((count, item) => count + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
