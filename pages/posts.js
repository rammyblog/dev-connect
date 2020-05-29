import PostListing from "../components/posts/PostListing"
import { PrivateRoute } from "../utils/PrivateRoute"
import DynamicTitle from "../components/presentational/DynamicTitle"

function posts() {
  return (
    <>
      <DynamicTitle title="Join the Conversation" />
      <PostListing />
    </>
  )
}

export default PrivateRoute(posts)
