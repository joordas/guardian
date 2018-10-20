import React, { Component } from "react";
import Link from "next/link";

class Home extends Component {
  render() {
    return (
      <div>
        <Link href="/list">
          <a>Hello</a>
        </Link>
      </div>
    );
  }
}

export default Home;
