import { handleResponse, handleError } from "./apiUtils"
import axios from "axios"
const baseUrl = process.env.BASE_URL + "api/experience/"

export function addExperienceApi(
  company_name,
  job_title,
  location,
  from_date,
  to_date,
  is_current,
  desc
) {
  let body = {
    company_name: company_name,
    job_title: job_title,
    location: location,
    from_date: from_date,
    to_date: to_date,
    is_current: is_current,
    desc: desc,
  }

  is_current ? delete body.to_date : body
  return axios
    .post(baseUrl, body, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

export function loadExperienceApi() {
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

export function loadUserExperienceApi() {
  return axios
    .get(baseUrl + "user/list", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then(handleResponse)
    .catch(handleError)
}

// "sch_name": "Olabisi",
// "from_date": "2020-05-15",
// "to_date": "2020-06-18",
// "is_current": false,
// "desc": "fhffhhfhfhfh"
