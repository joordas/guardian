import React, { Component } from "react";
import TabBar from "./TabBar";

class Page extends Component {
  render() {
    return (
      <div className="tab-bar">
        {this.props.children}
        <TabBar />
      </div>
    );
  }
}

export default Page;
