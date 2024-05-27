import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter-slice";
import productReducer from "./product/product-slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
