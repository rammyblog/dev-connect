import { connect, useDispatch, useStore } from "react-redux"
import { loadPostsDispatch } from "../../redux/post/postActions"
import Link from "next/link"
import CommentForm from "./comments/CommentForm"
import PostsLoaded from "../../utils/PostsLoaded"
import { useEffect, useState } from "react"
import { loadCommentsDispatch } from "../../redux/comments/CommentsAction"
import SingleComment from "./comments/SingleComment"

function PostDetail({ id, posts, comments }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsDispatch(id))
    getPost()
  }, [posts])

  const { posts: allPosts } = posts
  const { comments: allComments } = comments
  const [currentPost, setcurrentPost] = useState(null)

  const getPost = () => {
    const singlePost = allPosts.filter((post) => post.id == id)
    setcurrentPost(singlePost[0])
  }

  return (
    <>
      <section className="container">
        <Link href="/posts">
          <a className="btn">Back To Posts</a>
        </Link>
        {currentPost ? (
          <>
            <div className="post bg-white p-1 my-1">
              <div>
                <Link href="/profile/[id]" as={`/profile/${currentPost.user}`}>
                  <a>
                    <img src={currentPost.image} alt="" className="round-img" />
                    <h4>{currentPost.full_name}</h4>
                  </a>
                </Link>
              </div>
              <div>
                <p className="my-1">{currentPost.content}</p>
              </div>
            </div>

            <div className="post-form">
              <div className="post-form-header bg-primary">
                <h3>Leave A Comment</h3>
              </div>
              <CommentForm post_id={currentPost.id} />
            </div>
          </>
        ) : null}

        <div className="posts">
          {allComments
            ? allComments.map((comment, idx) => (
                <SingleComment comment={comment} key={idx} />
              ))
            : null}
        </div>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  loadPostsDispatch,
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
  }
}

export default PostsLoaded(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
)
