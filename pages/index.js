import React, { Component, Fragment } from "react";
import ListItem from '../src/components/ListItem'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <ListItem url="/disaster" text={'Enchente'} />
        <ListItem url="/disaster" text={'Furacão'} />
        <ListItem url="/disaster" text={'Terremoto'} />
        <ListItem url="/disaster" text={'Queimada'} />
      </Fragment>
    );
  }
}

export default Home;
