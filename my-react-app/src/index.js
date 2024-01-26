import './index.css';


import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home';
import Articles from './Pages/Article';
import { CartPage } from './Pages/Panier'; // Ajout de l'import pour la page du panier

import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from './Providers/CartContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/articles/:id",
    element: <Articles />
  },
  {
    path: "/panier",
    element: <CartPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </Provider>
  </React.StrictMode>
);

// Si vous souhaitez mesurer les performances de votre application, vous pouvez utiliser reportWebVitals.
reportWebVitals();
