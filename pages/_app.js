import React, { Component } from "react";
import Page from "../src/components/Page";

class App extends Component {
  render() {
    return <Page>{this.props.children}</Page>;
  }
}

export default App;
