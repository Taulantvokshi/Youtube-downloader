import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/exports';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') // make sure this is the same as the id of the div in your index.html
);
