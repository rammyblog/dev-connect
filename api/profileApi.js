import { handleResponse, handleError } from "./apiUtils"
import axios from "axios"
const baseUrl = process.env.BASE_URL + "api/profile/"

export function getProfile() {
  return axios
    .get(baseUrl, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function getUserProfileAPI() {
  return axios
    .get(baseUrl + "user/list", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function editProfileAPI({
  professionalStatus,
  companyName,
  website,
  location,
  skills,
  githubUsername,
  bio,
  twitterLink,
  facebookLink,
  instagramLink,
  linkedinLink,
  id,
}) {
  console.log({ skills })

  const body = {
    bio: bio,
    skills: skills,
    facebook_link: facebookLink,
    linkedin_link: linkedinLink,
    twitter_link: twitterLink,
    website: website,
    instagram_link: instagramLink,
    github_link: githubUsername,
    professional_status: professionalStatus,
    location: location,
  }
  return axios
    .patch(baseUrl + id + "/", body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}
