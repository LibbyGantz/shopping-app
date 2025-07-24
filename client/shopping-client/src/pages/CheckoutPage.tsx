import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { useState } from 'react';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.email) {
      alert('נא למלא את כל השדות');
      return;
    }

    const order = {
      customer: formData,
      items: cartItems,
    };

    console.log('הזמנה נשלחה:', order);
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">סיכום הזמנה</h2>

      <div className="grid gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="שם מלא"
          className="border px-4 py-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="כתובת מלאה"
          className="border px-4 py-2 rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="כתובת מייל"
          className="border px-4 py-2 rounded"
          onChange={handleChange}
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">מוצרים שנבחרו:</h3>
      <ul className="mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between py-1 border-b">
            <span>{item.name} × {item.quantity}</span>
            <span>₪{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
      >
        אשר הזמנה
      </button>
    </div>
  );
};

export default CheckoutPage;
