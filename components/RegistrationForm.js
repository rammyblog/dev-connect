import { useState } from "react"
import { connect } from "react-redux"
import { authLogin, authRegister } from "../redux/auth/authActions"
import Alert from "./presentational/alert"
import Loading from "./presentational/loading"
import Link from "next/link"
import { spiltFullName } from "./utils"

import { useForm } from "../hooks/useForm"

function RegistrationForm({ authLogin, auth, authRegister }) {
  const { error, response, loading } = auth

  const [alertShow, setalertShow] = useState(true)

  const toggleShow = () => {
    setalertShow(false)
  }

  const [values, handleChange] = useForm({
    email: "",
    password1: "",
    password2: "",
    fullname: "",
  })

  const handleSubmit = (e) => {
    const { email, password1, password2, fullname } = values

    e.preventDefault()
    const names_array = spiltFullName(fullname)

    let first_name = names_array[0]
    let last_name = names_array[1]

    authRegister(first_name, last_name, email, password1, password2)
    setalertShow(error)
  }
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        {error ? (
          <Alert
            message={response}
            class_name={"alert-danger"}
            show={alertShow}
            toggleShow={toggleShow}
          />
        ) : null}

        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              required
              value={values.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
            />
            <small className="form-text">
              This site uses Gravatar, so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              minLength="8"
              name="password1"
              required
              onChange={handleChange}
              value={values.password}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              minLength="8"
              name="password2"
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
            <input type="submit" value="Register" className="btn btn-primary" />
          )}
        </form>
        <p className="my-1">
          Already have an account?{" "}
          <Link href="/login">
            <a>Sign in</a>
          </Link>
        </p>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  authLogin,
  authRegister,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
