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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCancel = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error for the field being changed
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'נא להזין שם מלא';
    if (!formData.address.trim()) newErrors.address = 'נא להזין כתובת מלאה';
    if (!formData.email.trim()) newErrors.email = 'נא להזין כתובת מייל';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'כתובת מייל לא תקינה';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const order = {
      customer: formData,
      items: cartItems,
    };

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('ההזמנה נכשלה');
      }

      alert('ההזמנה התקבלה!');
      dispatch(clearCart());
      navigate('/');
    } catch (err) {
      alert('שגיאה בשליחת ההזמנה');
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow items-center">
      <h2 className="text-2xl font-bold mb-6 flex justify-center">סיכום הזמנה</h2>

      <div className="grid gap-4 mb-6 justify-right items-center content-center">
        <div>
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            className={`border px-4 py-2 rounded w-full ${errors.name ? 'border-red-600' : ''}`}
            onChange={handleChange}
            value={formData.name}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="כתובת מלאה"
            className={`border px-4 py-2 rounded w-full ${errors.address ? 'border-red-600' : ''}`}
            onChange={handleChange}
            value={formData.address}
          />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="כתובת מייל"
            className={`border px-4 py-2 rounded w-full ${errors.email ? 'border-red-600' : ''}`}
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 flex justify-center">מוצרים שנבחרו:</h3>
      <ul className="mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between py-1 border-b">
            <span>{item.name} × {item.quantity}</span>
            <span>₪{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold">סך הכל:</span>
        <span className="text-lg font-semibold">
          ₪{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleCancel}
          className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-xl justify-center"
        >
          ביטול
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 flex justify-center"
        >
          אשר הזמנה
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
