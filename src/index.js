import React from "react";

import ReactDOM from "react-dom";

import "./styles.css";

import App from "./App";
import "antd/dist/antd.css";
// REDUX

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);
