import React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import withReduxStore from "../lib/with-redux-store"
import "../styles/styles.min.css"
import Navbar from "../components/Navbar"

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
