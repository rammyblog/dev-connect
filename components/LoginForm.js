import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { authLogin } from "../redux/auth/authActions"
import Alert from "./presentational/alert"
import Loading from "./presentational/loading"
import { useForm } from "../hooks/useForm"
import Link from "next/link"
import { useDispatch } from "react-redux"
import Router from "next/router"

function LoginForm({ authLogin, auth }) {
  const { error, response, loading } = auth
  const dispatch = useDispatch()

  const [alertShow, setalertShow] = useState(true)
  const routeChangeStart = (url) => {
    dispatch({ type: "AUTH_RESET" })
  }

  Router.events.on("routeChangeStart", routeChangeStart)

  const toggleShow = () => {
    setalertShow(value)
  }

  const [values, handleChange] = useForm({
    email: "",
    password: "",
  })

  useEffect(() => {
    setalertShow(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    authLogin(values.email, values.password)
  }
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        {error ? (
          <Alert
            message={response}
            class_name={"alert-danger"}
            show={alertShow}
            toggleShow={toggleShow}
          />
        ) : null}

        <p className="lead">
          <i className="fas fa-user"></i> Sign in into Your Account
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              minLength="8"
              name="password"
              required
              onChange={handleChange}
              value={values.password}
            />
          </div>
          {loading ? (
            <button className="btn btn-primary">
              <Loading />
            </button>
          ) : (
            <input type="submit" value="Login" className="btn btn-primary" />
          )}
        </form>
        <p className="my-1">
          Don't have an account?{" "}
          <Link href="/register">
            <a>Sign up</a>
          </Link>
        </p>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  authLogin,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
