import React, { Component } from 'react';
import Link from 'next/link';
import f from './firebase';

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
