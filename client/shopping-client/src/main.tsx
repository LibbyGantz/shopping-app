import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
  לחצן ניסיון
</button> */}
    </Provider>
  </React.StrictMode>,
);

