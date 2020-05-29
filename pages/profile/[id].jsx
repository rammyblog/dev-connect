import Profile from "../../components/Profile"
import { useRouter } from "next/router"
import { PrivateRoute } from "../../utils/PrivateRoute"
import DynamicTitle from "../../components/presentational/DynamicTitle"

function profile() {
  const router = useRouter()
  const user_id = router.query.id

  return (
    <>
      <DynamicTitle title="Profile" />
      <Profile id={user_id} />
    </>
  )
}

export default PrivateRoute(profile)
