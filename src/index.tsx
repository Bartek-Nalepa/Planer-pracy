import React from 'react';
import ReactDOM from 'react-dom';
import actions from "./redux/planned/actions"
import './index.css';
import Planner from './pages/planner';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducers from "./redux/reducers"

const history = createBrowserHistory();
const store = createStore(reducers(history))

// localStorage.removeItem("planned")
store.dispatch({
  type: actions.SET_INITIAL,
  payload: localStorage.getItem("planned")
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <Planner />
    </Provider>
  </React.StrictMode>, 
  document.getElementById('root')
);