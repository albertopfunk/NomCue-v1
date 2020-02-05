import App from 'next/app'
import { UserContextProvider } from '../global/UserContext'
import Router from 'next/router'



class AppWrapper extends App {
  state = {
    isLoading: true
  }

  componentDidMount() {

    this.setState({isLoading: false})

    Router.events.on('routeChangeStart', url => {
      console.log(`routeChangeStart ON: ${url}`)
      this.setState({isLoading: true})

    })

    Router.events.on('routeChangeComplete', url => {
      console.log(`routeChangeComplete ON: ${url}`)
      this.setState({isLoading: false})
    })

    Router.events.on('routeChangeError', url => {
      console.log(`routeChangeError ON: ${url}`)
      this.setState({isLoading: false})
    })
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', url => {
      console.log(`routeChangeStart OFF: ${url}`)
    })
    
    Router.events.off('routeChangeComplete', url => {
      console.log(`routeChangeComplete OFF: ${url}`)
    })

    Router.events.off('routeChangeError', url => {
      console.log(`routeChangeError OFF: ${url}`)
    })
  }


  render() {
    const { Component, pageProps } = this.props

    console.log("=====HELLO MAIN_APP=====", this.state)
    
    return (
      <UserContextProvider>
        {this.state.isLoading?
          <h1>LOADING....</h1>
          :
          <Component {...pageProps} />
        }
      </UserContextProvider>
    )
  }
}

export default AppWrapper


