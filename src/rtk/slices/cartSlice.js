import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// createAsynctThunk for adding item to cart on backend
export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async (item, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/cart/add-item",
        {
          product_id: item.id,
          quantity: item.quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.cartItems.findIndex(
        (product) => product.id === action.payload.id
      );
      if (findProduct >= 0) {
        state.cartItems[findProduct].quantity += 1;
      } else {
        const clonedProducts = { ...action.payload, quantity: 1 };
        state.cartItems.push(clonedProducts);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    increaseAmount: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseAmount: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    deleteItem: (state, action) => {
      const removeItem = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setGetTotals: (state) => {
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, discountPrice, quantity } = cartItem;
          if (discountPrice) {
            const allPrice = discountPrice * quantity;
            cartTotal.totalAmount += allPrice;
          } else {
            const allPrice = price * quantity;
            cartTotal.totalAmount += allPrice;
          }
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartBackend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  increaseAmount,
  decreaseAmount,
  clearCart,
  deleteItem,
  setGetTotals,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;
export default cartSlice.reducer;
