import App from "next/app";
import Router from "next/router";
import { UserContextProvider } from "../components/global/UserContext";
import "../css/tailwind.css";

class AppWrapper extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });

    Router.events.on("routeChangeStart", () => {
      this.setState({ isLoading: true });
    });

    Router.events.on("routeChangeComplete", () => {
      this.setState({ isLoading: false });
    });

    Router.events.on("routeChangeError", () => {
      this.setState({ isLoading: false });
    });
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", () => {
      return;
    });

    Router.events.off("routeChangeComplete", () => {
      return;
    });

    Router.events.off("routeChangeError", () => {
      return;
    });
  }

  render() {
    const { Component, pageProps } = this.props;

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
