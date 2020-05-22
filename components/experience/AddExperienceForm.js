import Alert from "../presentational/alert"
import Loading from "../presentational/loading"
import Link from "next/link"
import { PrivateRoute } from "../../utils/PrivateRoute"
import { connect } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react"

import { addExperienceDispatch } from "../../redux/experience/experienceActions"

function AddExperienceForm({ addExperienceDispatch }) {
  const [isCurrent, setIsCurrent] = useState(false)
  const [showError, setShowError] = useState(true)

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Add Your Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <Formik
          initialValues={{
            job_title: "",
            company_name: "",
            location: "",
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

            addExperienceDispatch(
              values.company_name,
              values.job_title,
              values.location,
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
                placeholder="* Job Title"
                name="job_title"
                required
              />
              <ErrorMessage name="job_title" component="div" />
              <Field
                type="text"
                className="form-group"
                placeholder="* Company"
                name="company_name"
                required
              />
              <ErrorMessage name="company_name" component="div" />
              <Field
                type="text"
                className="form-group"
                placeholder="Location"
                name="location"
              />
              <ErrorMessage name="location" component="div" />
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
              Current Job
              <ErrorMessage
                className="text-danger"
                name="current"
                component="div"
              />
              <Field
                component="textarea"
                className="form-group"
                placeholder="Job Description"
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
  addExperienceDispatch,
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   }
// }

export default connect(null, mapDispatchToProps)(AddExperienceForm)
