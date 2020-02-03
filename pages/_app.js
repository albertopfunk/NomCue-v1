import App from 'next/app'
import { UserContextProvider } from '../global/UserContext'

class AppWrapper extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    )
  }
}

export default AppWrapper