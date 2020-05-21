import React from "react"
import UserDashboard from "../components/UserDashboard"
import { PrivateRoute } from "../utils/PrivateRoute"

function dashboard() {
  return (
    <div>
      <UserDashboard />
    </div>
  )
}

export default PrivateRoute(dashboard)
