import Profile from "../components/Profile"
import { PrivateRoute } from "../utils/PrivateRoute"

function profile() {
  return (
    <>
      <Profile />
    </>
  )
}

export default PrivateRoute(profile)
