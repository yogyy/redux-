import { ProductState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductState = {
  title: "product name",
  price: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ProductState>) => {
      state.title = action.payload.title;
      state.price = action.payload.price;
    },
  },
});

export const { update } = productSlice.actions;
export default productSlice.reducer;
