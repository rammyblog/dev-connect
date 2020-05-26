import React, { useEffect, useCallback } from "react"
import PostForm from "./posts/PostForm"
import SinglePost from "./posts/SinglePost"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { loadPostsDispatch } from "../redux/post/postActions"

function PostListing({ post, loadPostsDispatch }) {
  const dispatch = useDispatch()
  const { posts: allPosts } = post

  const getPosts = useCallback(() => {
    dispatch(loadPostsDispatch)
  }, [dispatch])

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <section class="container">
        <h1 class="large text-primary">Posts</h1>

        <p class="lead">
          <i class="fas fa-user"></i>Welcome to the community
        </p>
        <div class="post-from">
          <PostForm />

          <div class="posts">
            {allPosts && allPosts.length > 0 ? (
              allPosts.map((post, id) => <SinglePost key={id} post={post} />)
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
}

function mapStateToProps(state) {
  return {
    post: state.posts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListing)
