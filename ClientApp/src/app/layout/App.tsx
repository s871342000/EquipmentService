import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "../../features/Login"
import Device from "../../features/DeviceDetail"

export default class App extends Component {
  render() {
    Home
    return (
      /*<Router>
        <Route exact path="/" component={Home} />
        <Route path="/DeviceDetail" component={Device} />
      </Router>*/
    );
  }
}