import Link from "next/link"

function Navbar() {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="dashboard.html">
          <i className="fas fa-code"></i> DevConnector
        </a>
      </h1>

      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
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
      </ul>
    </nav>
  )
}

export default Navbar
