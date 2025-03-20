import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
