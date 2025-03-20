import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

// Define Item Type
export interface CartItem {
  id: number;
  title?: string;
  name?: string;
  information?: string;
  price: number;
  quantity: number;
  productimage?: { link: string }[];
}

// Define Cart State Type
interface CartState {
  cartItems: CartItem[];
  cartTotalAmount: number;
  cartTotalQuantity: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial State
const initialState: CartState = {
  cartItems: localStorage.getItem("cart")
    ? (JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[])
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  status: "idle",
  error: null,
};

// **Async Thunk for adding item to cart on backend**
export const addToCartBackend = createAsyncThunk<
  CartItem, // Type of returned data
  CartItem, // Type of payload argument
  { rejectValue: string } // Type of rejected value
>("cart/addToCartBackend", async (item, { rejectWithValue }) => {
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
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

// **Cart Slice**
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const findProduct = state.cartItems.findIndex(
        (product) => product.id === action.payload.id
      );
      if (findProduct >= 0) {
        state.cartItems[findProduct].quantity += 1;
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(newProduct);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    increaseAmount: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseAmount: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setGetTotals: (state) => {
      const { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          cartTotal.totalAmount += price * quantity;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        { totalAmount: 0, totalQuantity: 0 }
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
        state.cartItems.push(action.payload);
      })
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add item to cart";
      });
  },
});

// **Export Actions**
export const {
  addToCart,
  increaseAmount,
  decreaseAmount,
  clearCart,
  deleteItem,
  setGetTotals,
} = cartSlice.actions;

// **Selectors**
export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cartItems;
export const selectTotalAmount = (state: { cart: CartState }) =>
  state.cart.cartTotalAmount;
export const selectTotalQTY = (state: { cart: CartState }) =>
  state.cart.cartTotalQuantity;

// **Reducer Export**
export default cartSlice.reducer;
