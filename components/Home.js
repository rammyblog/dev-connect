import Link from "next/link"
import { connect } from "react-redux"

function Home({ isAuthenticated }, props) {
  return (
    <>
      <section className="landing">
        <div className="homepage-header">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create Developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              {!isAuthenticated ? (
                <>
                  <Link href="/register">
                    <a className="btn btn-primary">Register</a>
                  </Link>

                  <Link href="/login">
                    <a className="btn ">Login</a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profiles">
                    <a className="btn ">Browse Profiles</a>
                  </Link>
                </>
              )}
            </div>
          </div>
          <object
            className="img-fluid"
            data="../images/connection.svg"
            type=""
          ></object>
        </div>
      </section>
    </>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Home)
