import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
import "./app/layout/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
