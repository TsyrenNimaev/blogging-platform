import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import { rootReducer } from './store/root-reducer';
// import articleReducer from './store/article-reducer';

import './style/index.scss';

// type RootState = ReturnType<typeof articleReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
