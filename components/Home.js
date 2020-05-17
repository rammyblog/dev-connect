import React from "react"

export default function Home() {
  return (
    <>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create Developer profile/portfolio, share posts and get help from
              other developers{" "}
            </p>
            <div className="buttons">
              <a href="register.html" className="btn btn-primary">
                Sign up
              </a>
              <a href="login.html" className="btn ">
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
