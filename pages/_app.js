import App from "next/app";
import Router from "next/router";
import { UserContextProvider } from "../components/global/UserContext";

class AppWrapper extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });

    Router.events.on("routeChangeStart", url => {
      console.log(`routeChangeStart ON: ${url}`);
      this.setState({ isLoading: true });
    });

    Router.events.on("routeChangeComplete", url => {
      console.log(`routeChangeComplete ON: ${url}`);
      this.setState({ isLoading: false });
    });

    Router.events.on("routeChangeError", url => {
      console.log(`routeChangeError ON: ${url}`);
      this.setState({ isLoading: false });
    });
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", url => {
      console.log(`routeChangeStart OFF: ${url}`);
    });

    Router.events.off("routeChangeComplete", url => {
      console.log(`routeChangeComplete OFF: ${url}`);
    });

    Router.events.off("routeChangeError", url => {
      console.log(`routeChangeError OFF: ${url}`);
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    console.log("=====HELLO MAIN_APP=====", this.state);

    return (
      <UserContextProvider>
        {this.state.isLoading ? (
          <h1>LOADING....</h1>
        ) : (
          <Component {...pageProps} />
        )}
      </UserContextProvider>
    );
  }
}

export default AppWrapper;
