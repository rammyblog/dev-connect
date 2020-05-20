import Alert from "../presentational/alert"
import Loading from "../presentational/loading"
import { useForm } from "../../hooks/useForm"
import Link from "next/link"
import { PrivateRoute } from "../../utils/PrivateRoute"
import { connect } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react"

import { addEducationDispatch } from "../../redux/education/educationActions"

function AddEducationForm({ addEducationDispatch }) {
  // const [values, handleChange] = useForm({
  //   school: "",
  //   degree: "",
  //   fieldOfStudy: "",
  //   fromDate: "",
  //   toDate: "",
  //   current: false,
  //   description: "",
  //   error: "",
  //   errorMessage: "",
  // })

  const [isCurrent, setIsCurrent] = useState(false)
  const [showError, setShowError] = useState(true)

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <Formik
          initialValues={{
            school: "",
            degree: "",
            fieldOfStudy: "",
            fromDate: "",
            toDate: "",
            current: false,
            description: "",
          }}
          validate={(values) => {
            const errors = {}
            if (values.fromDate && values.toDate) {
              values.fromDate > values.toDate
                ? (errors.toDate = "To date cannot be lower than From Date")
                : null
            }
            if (values.current) {
              setShowError(false)
              setIsCurrent(true)
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)

            addEducationDispatch(
              values.school,
              values.fieldOfStudy,
              values.degree,
              values.fromDate,
              values.toDate,
              values.current,
              values.description
            )
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field
                type="text"
                className="form-group"
                placeholder="School or Bootcamp"
                name="school"
                required
              />
              <ErrorMessage name="school" component="div" />
              <Field
                type="text"
                className="form-group"
                placeholder="* Degree or Certificate"
                name="degree"
                required
              />
              <ErrorMessage name="degree" component="div" />
              <Field
                type="text"
                className="form-group"
                placeholder="Field Of Study"
                name="fieldOfStudy"
              />
              <ErrorMessage name="fieldOfStudy" component="div" />
              <h4>From Date</h4>
              <Field
                type="date"
                className="form-group"
                name="fromDate"
                required
              />
              <ErrorMessage name="fromDate" component="div" />
              <h4>To Date</h4>
              <Field
                type="date"
                className="form-group"
                disabled={isCurrent}
                name="toDate"
              />
              {showError ? (
                <ErrorMessage
                  name="toDate"
                  className="text-danger"
                  component="div"
                />
              ) : null}
              <Field type="checkbox" className="form-group" name="current" />{" "}
              Current
              <ErrorMessage
                className="text-danger"
                name="current"
                component="div"
              />
              <Field
                component="textarea"
                className="form-group"
                placeholder="Program Description"
                name="description"
                cols="30"
                rows="5"
                required
              />
              <ErrorMessage name="description" component="div" />
              <button
                type="submit"
                className="btn btn-primary my-1"
                disabled={isSubmitting}
              >
                Submit
              </button>
              <a className="btn my-1" href="dashboard.html">
                Go Back
              </a>
            </Form>
          )}
        </Formik>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  addEducationDispatch,
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   }
// }

export default connect(null, mapDispatchToProps)(AddEducationForm)
