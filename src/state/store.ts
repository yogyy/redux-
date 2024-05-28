import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter-slice";
import productReducer from "./product/product-slice";
import todoReducer from "./todo/todo-slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    counter: counterReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
