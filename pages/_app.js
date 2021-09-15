// next js uses app component to initialize pages. you can overide it and control the page initialization. Which allows..
// persisting layout between pages
// keeping state when navigating pages
// custom error handling
// inject additional data to pages
// add global css

import App from "next/app";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Layout>
        <Component></Component>
      </Layout>
    );
  }
}

export default MyApp;
