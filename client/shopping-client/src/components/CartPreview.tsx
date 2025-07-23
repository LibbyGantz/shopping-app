import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const CartPreview = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

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
          <li key={item.id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>₪{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPreview;
