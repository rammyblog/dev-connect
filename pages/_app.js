import React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import withReduxStore from "../lib/with-redux-store"
import "../styles/styles.min.css"
import Navbar from "../components/Navbar"
import { authCheckState } from "../redux/auth/authActions"
import { connect } from "react-redux"

import ErrorPage from "./_error"

import Router, { useRouter } from "next/router"
import Head from "next/head"
import NProgress from "nprogress"

Router.events.on("routeChangeStart", (url) => {
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

class MyApp extends App {
  componentDidMount() {
    this.props.store.dispatch(authCheckState())
  }

  render() {
    const { Component, pageProps, store } = this.props
    const errorText =
      "Sorry, Something unexpected happened and reload this page"

    return (
      <Provider store={store}>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <Navbar />
        <div className="">
          {this.props.api < 0 ? (
            <ErrorPage text={errorText} />
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </Provider>
    )
  }
}

function mapStateToProps(state) {
  return {
    api: state.api,
  }
}

export default withReduxStore(connect(mapStateToProps)(MyApp))
