import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"

import Home from "../components/Home"

class Index extends PureComponent {
  render() {
    return (
      <>
        <Home />
      </>
    )
  }
}

const mapDispatchToProps = {
  loadProfiles,
}

export default connect(null, mapDispatchToProps)(Index)
