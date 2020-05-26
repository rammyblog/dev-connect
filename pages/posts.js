import PostListing from "../components/PostListing"
import { PrivateRoute } from "../utils/PrivateRoute"

function posts() {
  return (
    <div>
      <PostListing />
    </div>
  )
}

export default PrivateRoute(posts)
