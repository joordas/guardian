import React from "react";
import App, { Container } from "next/app";
import Page from "../src/components/Page";

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.this.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <Page>
          <Component {...pageProps} route={router.route}/>
        </Page>
      </Container>
    );
  }
}

export default CustomApp;
