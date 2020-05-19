import Profiles from "../components/Profiles"
import { PrivateRoute } from "../utils/PrivateRoute"

function profiles() {
  return (
    <>
      <Profiles />
    </>
  )
}

export default PrivateRoute(profiles)
