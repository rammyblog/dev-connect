import Profiles from "../components/Profiles"
import { PrivateRoute } from "../utils/PrivateRoute"
import DynamicTitle from "../components/presentational/DynamicTitle"

function profiles() {
  return (
    <>
      <DynamicTitle title="All Profiles" />
      <Profiles />
    </>
  )
}

export default PrivateRoute(profiles)
