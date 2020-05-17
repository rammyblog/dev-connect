import { handleResponse, handleError } from "./apiUtils"
import axios from "axios"
const baseUrl = process.env.BASE_URL + "rest-auth"

export function loginUser(email, password) {
  return axios
    .post(baseUrl + "/login/", {
      email: email,
      password: password,
    })
    .then(handleResponse)
    .catch(handleError)
}

export function registerUser(
  first_name,
  last_name,
  email,
  password1,
  password2
) {
  return axios
    .post(baseUrl + "/registration/", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password1: password1,
      password2: password2,
    })
    .then(handleResponse)
    .catch(handleError)
}

// export function saveCourse(course) {
//   return fetch(baseUrl + (course.id || ""), {
//     method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(course),
//   })
//     .then(handleResponse)
//     .catch(handleError)
// }

// export function deleteCourse(courseId) {
//   return fetch(baseUrl + courseId, { method: "DELETE" })
//     .then(handleResponse)
//     .catch(handleError)
// }
