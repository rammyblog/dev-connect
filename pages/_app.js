import React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import withReduxStore from "../lib/with-redux-store"
import "../styles/antPagination.css"
import "../styles/styles.min.css"
import Navbar from "../components/Navbar"
import { authCheckState, logout } from "../redux/auth/authActions"
import { connect } from "react-redux"

import ErrorPage from "./_error"

import Router from "next/router"
import Head from "next/head"
import NProgress from "nprogress"
import Footer from "../components/presentational/Footer"

Router.events.on("routeChangeStart", (url) => {
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

class MyApp extends App {
  componentDidMount() {
    this.props.store.dispatch(authCheckState())
  }

  // componentDidUpdate(prevProps, props) {
  //   console.log(this.props.isAuthenticated, "fjfjfj")

  //   if (!this.props.isAuthenticated) {
  //     Router.push("/login")
  //     // prevProps.store.dispatch(logout())
  //   }
  // }

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
        <div className="" style={{ minHeight: "100vh" }}>
          {this.props.api < 0 ? (
            <ErrorPage text={errorText} />
          ) : (
            <Component {...pageProps} />
          )}
        </div>
        <Footer />
      </Provider>
    )
  }
}

function mapStateToProps(state) {
  return {
    api: state.api,
    isAuthenticated: state.auth.token !== null,
  }
}

export default withReduxStore(connect(mapStateToProps)(MyApp))
