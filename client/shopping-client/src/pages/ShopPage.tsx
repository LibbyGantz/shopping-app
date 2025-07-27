import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/categories/categoriesSlice';
import {
  fetchProducts,
  setSelectedCategory,
} from '../features/products/productsSlice';
import type { RootState } from '../app/store';
import type { AppDispatch } from '../app/store';
import { addToCart } from '../features/cart/cartSlice';
import CartPreview from '../components/CartPreview';
import { useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.list);
  const selectedCategoryId = useSelector((state: RootState) => state.products.selectedCategoryId);
  const products = useSelector((state: RootState) =>
    state.products.list.filter((p) => p.categoryId === selectedCategoryId)
  );

  // Log all products fetched from the server *** CHECK */
  const fullProducts = useSelector((state: RootState) => state.products.list);

useEffect(() => {
  console.log('All products from server:', fullProducts);
}, [fullProducts]);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-white to-blue-50 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">רשימת קניות</h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="שם המוצר"
          className="border rounded px-4 py-2 w-1/3"
        />

        <select
          onChange={(e) => dispatch(setSelectedCategory(Number(e.target.value)))}
          className="border rounded px-4 py-2 w-1/3 bg-white"
        >
          <option value="">בחר קטגוריה</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
            <p className="text-sm text-gray-600 mb-4">₪{p.price.toFixed(2)}</p>
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              הוסף לסל
            </button> */}
            <button
  onClick={() => dispatch(addToCart(p))}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  הוסף לסל
</button>

          </div>
        ))}
      </div>

      <CartPreview />
      <div className="mt-10 flex justify-center">
        <button
  onClick={() => navigate('/checkout')}
  className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700"
>
  המשך להזמנה
</button>
      </div>

      <p>נבחרה קטגוריה: {selectedCategoryId}</p>
<p>מספר מוצרים שמוצגים: {products.length}</p>

    </div>
  );
};

export default ShopPage;

