import React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import withReduxStore from "../lib/with-redux-store"
import "../styles/styles.min.css"
import Navbar from "../components/Navbar"
import { connect } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"

import { PersistGate } from "redux-persist/integration/react"

class MyApp extends App {
  componentDidUpdate(prevProps) {
    // console.log(this.props.profile.length)
    console.log(this.props.profiles)

    if (!this.props.profiles || this.props.profiles.length <= 0) {
      this.props.loadProfiles()
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   // Any time the current user changes,
  //   // Reset any parts of state that are tied to that user.
  //   // In this simple example, that's just the email.
  //   if (!props.profile) {
  //     props.loadProfiles()
  //   }
  //   return null
  // }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Navbar />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    )
  }
}

const mapDispatchToProps = {
  loadProfiles,
}
function mapStateToProps(state) {
  return {
    profiles: state.profiles,
  }
}

export default withReduxStore(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
)
