import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "../layout/Login"
import QRCodeContent from "../layout/QRCodeContent"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Route exact path="/equipment-service" component={Home} />
        <Route path="/equipment-service/:sn" render={props => <QRCodeContent sn={props.match.params.sn} />} />
      </BrowserRouter>
    );
  }
}