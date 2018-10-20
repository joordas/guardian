import React, { Component } from 'react';
import Link from 'next/link';
import f from '../firebase';

class Home extends Component {
  writeToDb() {
    f.database()
      .ref('batata')
      .set({
        batata: 'batata'
      });
  }

  render() {
    return (
      <div>
        <Link href="/list">
          <a>Hello</a>
        </Link>
        <button onClick={this.writeToDb}>oi</button>
      </div>
    );
  }
}

export default Home;
