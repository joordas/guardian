import React, { Component } from 'react';
import CheckListComponent from '../src/components/CheckList';

class Checklist extends Component {
  render() {
    return (
      <div>
        <p>Checklist</p>
        <CheckListComponent />
      </div>
    );
  }
}

export default Checklist;
