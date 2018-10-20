import React, { Component } from 'react';
import TabBar from './TabBar';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
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
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <Global />
          {this.props.children}
          <TabBar />
        </>
      </ThemeProvider>
    );
  }
}

export default Page;
