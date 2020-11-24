import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import Routing from './routing';
import {Provider} from "react-redux";
import {store} from "./store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
              <Routing />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
