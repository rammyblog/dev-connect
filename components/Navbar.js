import Link from "next/link"

function Navbar() {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link href="/profiles">
          <a>
            <i className="fas fa-code"></i> DevConnector
          </a>
        </Link>
      </h1>

      <ul>
        <li>
          <Link href="/profiles">
            <a>Developers</a>
          </Link>
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
