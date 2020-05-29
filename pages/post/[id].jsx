import { useRouter } from "next/router"
import { PrivateRoute } from "../../utils/PrivateRoute"
import PostDetail from "../../components/posts/PostDetail"
import DynamicTitle from "../../components/presentational/DynamicTitle"

function post() {
  const router = useRouter()
  const post_id = router.query.id

  return (
    <>
      <DynamicTitle title="Join the conversation" />
      <PostDetail id={post_id} />
    </>
  )
}

export default PrivateRoute(post)
