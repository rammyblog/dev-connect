import Link from "next/link"

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
              <Link href="/register">
                <a className="btn btn-primary">Register</a>
              </Link>

              <Link href="/login">
                <a className="btn ">Login</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
