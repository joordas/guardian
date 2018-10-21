import React, { Component } from 'react';
import styled from 'styled-components';
import pages from '../onboarding';
import OnboardingPage from './OnboardingPage';
import Router from 'next/router';

export const ONBOARDING_DONE = 'ONBOARDING_DONE';

class Onboarding extends Component {
  state = {
    page: 0
  };

  changePage = q => {
    const { page } = this.state;
    let newPage = this.state.page + q;
    if (newPage < 0 || newPage > pages.length - 1) {
      newPage = page;
    }
    this.setState({
      page: newPage
    });
  };

  finishOnboarding() {
    // TODO: not workig setting/getting, probably have to parse strings
    localStorage.setItem(ONBOARDING_DONE, true);
    Router.push({
      pathname: '/disasters'
    });
  }

  render() {
    const { page } = this.state;
    return (
      <Wrapper>
        <OnboardingPage page={pages[page]} />
        <button
          disabled={page === 0}
          onClick={() => this.changePage(-1)}
        >
          prev
        </button>
        <button
          disabled={page === pages.length - 1}
          onClick={() => this.changePage(1)}
        >
          next
        </button>
        {page === pages.length - 1 && (
          <DoneButton onClick={this.finishOnboarding}>
            done
          </DoneButton>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  /* background-color: black; */
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DoneButton = styled.button``;

export default Onboarding;
