import React, { Component } from 'react';
import OnboardingComponent from '../src/components/Onboarding';

class Onboarding extends Component {
  componentDidMount() {
    // localstorage.getItem
    // TODO check if onboarding was done
  }

  render() {
    return <OnboardingComponent />;
  }
}

export default Onboarding;
