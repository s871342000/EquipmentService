import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
import "./app/layout/styles.css";
import Login from "./features/Login";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Login />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
