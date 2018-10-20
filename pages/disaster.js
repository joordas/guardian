import React, { Component } from "react";
import ListItem from '../src/components/ListItem'

class Disaster extends Component {
  render() {
    return (
      <ListItem text={this.props.query.disaster} url={''} />
    );
  }
}

export default Disaster;
