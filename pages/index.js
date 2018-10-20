import React, { Component, Fragment } from "react";
import ListItem from '../src/components/ListItem'
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
