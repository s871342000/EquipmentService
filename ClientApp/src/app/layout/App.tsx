import React, { Component, Fragment } from "react";
import { Items } from "../../features/Items";
import NavBar from "../../features/nav/NavBar";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Items />
      </Fragment>
    );
  }
}
