import React, { PureComponent } from "react"
import { connect } from "react-redux"
import Link from "next/link"
import { startClock, serverRenderClock, loadProfiles } from "../actions"
import Examples from "../components/examples"
import App from "../components/App"
import Navbar from "../components/Navbar"
import Home from "../components/Home"

class Index extends PureComponent {
  static getInitialProps({ store, req }) {
    store.dispatch(serverRenderClock(!!req))

    return {}
  }

  componentDidMount() {
    this.timer = this.props.startClock()
    this.props.loadProfiles()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <>
        <Home />
      </>
    )
  }
}

const mapDispatchToProps = {
  startClock,
  loadProfiles,
}

export default connect(null, mapDispatchToProps)(Index)
