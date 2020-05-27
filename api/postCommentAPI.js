import { handleResponse, handleError } from "./apiUtils"
import axios from "axios"
const baseUrl = process.env.BASE_URL + "api/"

export function addPostApi(content) {
  let body = {
    content: content,
    likes: 0,
    dislikes: 0,
  }

  return axios
    .post(baseUrl + "post/", body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function loadPostsApi() {
  return axios
    .get(
      baseUrl + "post/",

      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(handleResponse)
    .catch(handleError)
}

export function deletePostApi(id) {
  return axios
    .delete(baseUrl + id, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

// Likes

export function getLikesApi() {
  return axios
    .get(baseUrl + "likes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function addRemoveLikesApi({ id, action }) {
  // console.log(post, user_id, id)

  let body = {
    action: action,
  }

  return axios
    .patch(baseUrl + "likes/" + id + "/", body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function removeLikesApi({ post, user_id, id }) {
  let body = {
    post: post,
    user: user_id,
    action: "remove",
  }

  return axios
    .patch(baseUrl + "likes/" + id, body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

// Dislikes

export function addRemoveDislikesApi({ post, user_id, id, action }) {
  let body = {
    post: post,
    user: user_id,
    action: action,
  }

  return axios
    .patch(baseUrl + "dislikes" + id, body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function getDislikesApi() {
  return axios
    .get(baseUrl + "dislikes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}
