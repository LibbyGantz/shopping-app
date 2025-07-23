import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

interface ProductsState {
  list: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedCategoryId: number | null;
}

const initialState: ProductsState = {
  list: [],
  status: 'idle',
  selectedCategoryId: null,
};

// בעתיד יוחלף ב-fetch מהשרת
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return [
    { id: 1, name: 'תפוח', categoryId: 1, price: 2.5 },
    { id: 2, name: 'בננה', categoryId: 1, price: 3 },
    { id: 3, name: 'גזר', categoryId: 2, price: 1.8 },
    { id: 4, name: 'במבה', categoryId: 3, price: 4.5 },
  ];
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<number>) {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
