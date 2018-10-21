import React, { Component } from 'react';
import ListItem from '../src/components/ListItem';

class Disasters extends Component {
  render() {
    return (
      <>
        <ListItem url="/map" text={'MAPA'} />
        <ListItem url="/disaster" text={'Enchente'} />
        <ListItem url="/disaster" text={'Furacão'} />
        <ListItem url="/disaster" text={'Terremoto'} />
        <ListItem url="/disaster" text={'Queimada'} />
      </>
    );
  }
}

export default Disasters;
