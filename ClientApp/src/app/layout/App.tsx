import React, { Component, Fragment } from "react";
import { Costumers } from "../../features/Customers";
import { Login } from "../../features/Login";
import NavBar from "../../features/nav/NavBar";

export default class App extends Component {
  // constructor(props: any){
  //   super(props);
  //   this.state = {
  //     login: false
  //   }
  // }

  // setLogin(){
  //   this.setState({
  //     login: true
  //   })
  // }

  render() {
    return (
      <Fragment>
        <NavBar />
        <Costumers />
        {/* <Login setLogin={this.state.login = {this.state.setLogin(this.state.login)}}/> */}
      </Fragment>
    );
  }
}