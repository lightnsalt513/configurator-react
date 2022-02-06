import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/global.scss';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import { store } from 'state/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);