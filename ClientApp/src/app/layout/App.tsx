import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "../layout/Login"
import QRCodeContent from "../layout/QRCodeContent"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/:sn" render={props => <QRCodeContent sn={props.match.params.sn} />} />
      </Router>
    );
  }
}