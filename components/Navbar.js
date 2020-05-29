import Link from "next/link"
import { connect } from "react-redux"
import { logout } from "../redux/auth/authActions"
import { useDispatch } from "react-redux"
import Head from "next/head"

function Navbar({ isAuthenticated }) {
  const dispatch = useDispatch()

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>
          Developer Connector | Create Developer profile/portfolio, share posts
          and get help from other developers
        </title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="./images/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="./images/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#17a2b8" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
      </Head>
      <nav className="navbar bg-dark">
        <h1>
          <Link href="/">
            <a>
              <i className="fas fa-code"></i> DevConnector
            </a>
          </Link>
        </h1>

        <ul>
          {!isAuthenticated ? (
            <>
              <li>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/profiles">
                  <a>Developers</a>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  <a>Posts</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a title="Dashboard">
                    <i className="fas fa-user"></i>
                    <span className="hide-sm">Dashboard</span>
                  </a>
                </Link>
              </li>
              <li
                onClick={() => dispatch(logout())}
                style={{ cursor: "pointer" }}
              >
                <a title="Logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="hide-sm">Logout</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

const mapDispatchToProps = {
  logout,
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
