import Link from "next/link"
import { connect } from "react-redux"
import { logout } from "../redux/auth/authActions"
import { useDispatch } from "react-redux"

function Navbar({ isAuthenticated }) {
  const dispatch = useDispatch()

  return (
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
