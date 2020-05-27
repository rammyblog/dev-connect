import React, { useEffect, useCallback } from "react"
import PostForm from "./posts/PostForm"
import SinglePost from "./posts/SinglePost"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { loadPostsDispatch } from "../redux/post/postActions"
import { loadLikesDispatch } from "../redux/likes/likesActions"
import {
  loadDislikeDispatch,
  addRemoveDislikeDispatch,
  removeDislikeDispatch,
} from "../redux/dislikes/dislikesActions"

function PostListing({
  post,
  likes,
  dislikes,
  loadPostsDispatch,
  loadLikesDispatch,
  loadDislikeDispatch,
  removeDislikeDispatch,
}) {
  const dispatch = useDispatch()
  const { posts: allPosts } = post
  const { likes: allLikes } = likes
  const { dislikes: allDislikes } = dislikes

  const getPosts = useCallback(() => {
    dispatch(loadPostsDispatch)
    dispatch(loadLikesDispatch)
    dispatch(loadDislikeDispatch)
  }, [dispatch])

  useEffect(() => {
    getPosts()
  }, [])

  const handleRemoveDislike = (id, user) => {
    removeDislikeDispatch({ id, user })
  }

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Posts</h1>

        <p className="lead">
          <i className="fas fa-user"></i>Welcome to the community
        </p>
        <div className="post-from">
          <PostForm />

          <div className="posts">
            {allPosts && allPosts.length > 0 ? (
              allPosts.map((post, id) => (
                <>
                  <div className="post bg-white my-1">
                    <SinglePost
                      key={id}
                      post={post}
                      likes={allLikes}
                      dislikes={allDislikes}
                      handleRemoveDislike={handleRemoveDislike}
                    />
                  </div>
                </>
              ))
            ) : (
              <p>Nothing</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  loadPostsDispatch,
  loadLikesDispatch,
  loadDislikeDispatch,
  removeDislikeDispatch,
}

function mapStateToProps(state) {
  return {
    post: state.posts,
    likes: state.likes,
    dislikes: state.dislikes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListing)
