import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  categoryId: number;     // Added categoryId to associate product with category
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

// Fetch products from the server
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('http://localhost:5166/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Product[] = await response.json();
  return data;
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
