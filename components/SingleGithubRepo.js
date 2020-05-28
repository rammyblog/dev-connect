import React from "react"

function SingleGithubRepo({ data }) {
  const {
    name,
    html_url,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
  } = data
  return (
    <>
      <div className="repo bg-white my-1 p-1">
        <div>
          <h4>
            <a href={html_url} rel="noopener" target="_blank">
              {name}
            </a>
          </h4>
          <p>{description}</p>
        </div>
        <div>
          <ul>
            <li className="badge badge-primary">Stars: {stargazers_count}</li>
            <li className="badge badge-dark">Watchers:{watchers_count}</li>
            <li className="badge badge-light">Forks: {forks_count}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SingleGithubRepo
