import React, { Component } from 'react';
import TabBar from './TabBar';
import styled, {
  createGlobalStyle,
  ThemeProvider
} from 'styled-components';
import theme from './theme';

const Global = createGlobalStyle`
  html: {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Roboto';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  input {-webkit-appearance: none; box-shadow: none !important; }
:-webkit-autofill { color: #fff !important; }
`;

const Inner = styled.div`
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Inner>
          <Global />
          {this.props.children}
          <TabBar />
        </Inner>
      </ThemeProvider>
    );
  }
}

export default Page;
