import React, { Component, Fragment } from 'react';
import ListItem from '../src/components/ListItem';
import f from '../firebase';
import Onboarding from './onboarding';
import Disasters from './disasters';

export const ONBOARDING_DONE = 'ONBOARDING_DONE';

class Home extends Component {
  state = {
    showOnboarding: true
  };

  writeToDb() {
    f.database()
      .ref('batata')
      .set({
        batata: 'batata'
      });
  }

  componentDidMount() {
    let showOnboarding;
    try {
      showOnboarding = localStorage.getItem(ONBOARDING_DONE);
    } catch {
      showOnboarding = true;
    }
    this.setState({ showOnboarding });
  }

  render() {
    const { showOnboarding } = this.state;
    if (showOnboarding) {
      return <Onboarding />;
    }
    return <Disasters />;
  }
}

export default Home;
