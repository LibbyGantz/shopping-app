import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



