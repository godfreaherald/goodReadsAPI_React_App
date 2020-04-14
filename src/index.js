import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import decode from "jwt-decode";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store";
import { loginUser } from "./actions/user";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
const dotenv = require("dotenv");
dotenv.config();

if (localStorage.eccomJwtToken) {
  const payload = decode(localStorage.eccomJwtToken);
  const user = {
    token: localStorage.eccomJwtToken,
    isConfirmed: payload.isConfirmed,
    email: payload.email
  };
  store.dispatch(loginUser(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
