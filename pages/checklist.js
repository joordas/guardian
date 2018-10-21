import React, { Component } from 'react';
import CheckListComponent from '../src/components/CheckList';
import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 4rem;
`;

class Checklist extends Component {
  render() {
    return (
      <div>
        <Title>Checklist</Title>
        <CheckListComponent />
      </div>
    );
  }
}

export default Checklist;
