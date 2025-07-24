import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';

const CartPreview = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="mt-10 p-4 bg-white shadow rounded text-gray-600 text-center">
        🛒 העגלה ריקה
      </div>
    );
  }

  return (
    <div className="mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">🛒 עגלת קניות</h2>
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              {item.name} × {item.quantity}
            </div>
            <div className="flex items-center gap-4">
              <span>₪{(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                הסר
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
  <button
    onClick={() => dispatch(clearCart())}
    className="text-sm text-gray-500 hover:text-red-600 underline"
  >
    רוקן עגלה
  </button>
</div>

    </div>
  );
};

export default CartPreview;

