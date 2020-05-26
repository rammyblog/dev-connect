import { handleResponse, handleError } from "./apiUtils"
import axios from "axios"
const baseUrl = process.env.BASE_URL + "api/post/"

export function addPostApi(content) {
  let body = {
    content: content,
    likes: 0,
    dislikes: 0,
  }

  return axios
    .post(baseUrl, body, {
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
      baseUrl,

      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(handleResponse)
    .catch(handleError)
}

// export function loadUserExperienceApi() {
//   return axios
//     .get(baseUrl + "user/list", {
//       headers: {
//         Authorization: `Token ${localStorage.getItem("token")}`,
//       },
//     })
//     .then(handleResponse)
//     .catch(handleError)
// }

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
