import React, { Component } from "react";

class Page extends Component {
  render() {
    return (
      <div className="tab-bar">
        {this.props.children}
        <h1>im the tab bar</h1>
      </div>
    );
  }
}

export default Page;
