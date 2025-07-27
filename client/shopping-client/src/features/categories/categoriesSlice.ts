import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Category {
  id: number;
  name: string;
}

interface CategoriesState {
  list: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CategoriesState = {
  list: [],
  status: 'idle',
};

// בהמשך תתחלף ב-fetch מהשרת
// export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
//   return [
//     { id: 1, name: 'פירות' },
//     { id: 2, name: 'ירקות' },
//     { id: 3, name: 'חטיפים' },
//   ];
// });

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const response = await fetch('http://localhost:5166/api/categories');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Category[] = await response.json();
  return data;
});


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categoriesSlice.reducer;
