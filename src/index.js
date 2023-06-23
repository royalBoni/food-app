import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { extendedApiSlice } from './features/posts/postSlice';
import { extendedApiReviewSlice } from './features/dishReviews/dishReviewsSlice';
import { extendedApiCartsSlice } from './features/cart/cartSlice';

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(extendedApiReviewSlice.endpoints.getReviews.initiate());
store.dispatch(extendedApiCartsSlice.endpoints.getCarts.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
