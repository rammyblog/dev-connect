import React from "react"
import UserDashboard from "../components/UserDashboard"
import { PrivateRoute } from "../utils/PrivateRoute"
import DynamicTitle from "../components/presentational/DynamicTitle"

function dashboard() {
  return (
    <div>
      <DynamicTitle title="Dashboard" />
      <UserDashboard />
    </div>
  )
}

export default PrivateRoute(dashboard)
