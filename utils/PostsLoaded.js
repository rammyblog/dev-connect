import React, { useState, useEffect, useCallback } from "react"

import { loadPostsDispatch } from "../redux/post/postActions"

import { useStore, useDispatch } from "react-redux"
import LoadingPage from "../components/presentational/LoadingPage"

const PostsLoaded = (Component) => {
  return function LoadAllPost(props) {
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)

    const store = useStore()
    const currentState = store.getState()
    const dispatch = useDispatch()

    const loadPostsFromDb = useCallback(async () => {
      setloading(true)

      dispatch(loadPostsDispatch())

      setloading(false)
    }, [dispatch])

    useEffect(() => {
      if (currentState.posts.posts && currentState.posts.posts.length <= 0) {
        loadPostsFromDb()
      }
    }, [])

    return <>{!loading ? <Component {...props} /> : <LoadingPage />}</>
  }
}

export default PostsLoaded
