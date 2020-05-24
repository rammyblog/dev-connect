import React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import withReduxStore from "../lib/with-redux-store"
import "../styles/styles.min.css"
import Navbar from "../components/Navbar"
import { authCheckState } from "../redux/auth/authActions"
import { connect } from "react-redux"
import ErrorState from "../utils/ErrorState"
import ErrorPage from "./_error"

class MyApp extends App {
  componentDidMount() {
    this.props.store.dispatch(authCheckState())
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.api)
  }
  render() {
    const { Component, pageProps, store } = this.props
    const errorText =
      "Please check your internet connection and reload this page"

    return (
      <Provider store={store}>
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
