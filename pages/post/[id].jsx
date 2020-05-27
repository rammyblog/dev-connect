import { useRouter } from "next/router"
import { PrivateRoute } from "../../utils/PrivateRoute"
import PostDetail from "../../components/posts/PostDetail"

function post() {
  const router = useRouter()
  const post_id = router.query.id

  return (
    <>
      <PostDetail id={post_id} />
    </>
  )
}

export default PrivateRoute(post)
