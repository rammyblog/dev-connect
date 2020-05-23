import { connect } from "react-redux"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  editProfileDispatch,
  loadUserProfile,
} from "../redux/profile/profileActions"
import EditableTagGroup from "./tags"

function EditProfile({ profiles, loadUserProfile, editProfileDispatch }) {
  const getProfile = useCallback(() => {
    loadUserProfile()
  }, [])
  useEffect(() => {
    getProfile()
  }, [])

  const { userProfile } = profiles

  const [skills, setSkills] = useState(profiles.skills || [])

  const handleTagChange = (tags) => {
    setSkills(tags)
    console.log({ skills }, "kfk")
  }

  return (
    <>
      {userProfile ? (
        <section className="container">
          <h1 className="large text-primary">Edit Your Profile</h1>

          <p className="lead">
            <i className="fas fa-user"></i>Let's get some information to make
            your profile standout
          </p>
          <small>* = required fields</small>

          {userProfile.map((profile, id) => (
            <Formik
              key={id}
              initialValues={{
                professionalStatus: profile.professional_status,
                companyName: profile.current_job || "",
                website: profile.website || "",
                location: profile.location || "",
                // skills: profile.skills || [],
                githubUsername: profile.github_link || "",
                bio: profile.bio || "",
                twitterLink: profile.twitter_link || "",
                facebookLink: profile.facebook_link || "",
                instagramLink: profile.instagram_link || "",
                linkedinLink: profile.linkedin_link || "",
                id: profile.id,
              }}
              validate={(values) => {
                const errors = {}

                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                values.skills = skills
                console.log(values)
                console.log(skills)

                editProfileDispatch(values)

                setSubmitting(false)
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="form">
                  <Field
                    component="select"
                    className="form-group"
                    placeholder="* Job Title"
                    name="professionalStatus"
                    required
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </Field>
                  <small className="form-text">
                    Give us an idea of where you are at in your career
                  </small>
                  <ErrorMessage name="professionalStatus" component="div" />
                  <Field
                    type="text"
                    className="form-group"
                    placeholder="Company"
                    name="companyName"
                    required
                  />
                  <small className="form-text">
                    Could be your own company or one you work for
                  </small>
                  <ErrorMessage name="companyName" component="div" />
                  <Field
                    type="text"
                    className="form-group"
                    placeholder="Website"
                    name="website"
                  />
                  <small className="form-text">
                    Could be your own or a company website
                  </small>
                  <ErrorMessage name="website" component="div" />
                  <Field
                    type="text"
                    className="form-group"
                    placeholder="Location"
                    name="location"
                  />
                  <small className="form-text">
                    City & state suggested (eg. Boston, MA)
                  </small>
                  <ErrorMessage name="location" component="div" />
                  {/* <Field
                    type="text"
                   
                    placeholder="* Skills"
                    name="skills"
                  /> */}
                  <div className="form-group">
                    <EditableTagGroup
                      handleTagChange={handleTagChange}
                      skills={skills}
                      className="form-group"
                    />
                  </div>
                  <small className="form-text">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                  <ErrorMessage name="skills" component="div" />
                  <Field
                    component="textarea"
                    className="form-group"
                    placeholder="Job Description"
                    name="bio"
                    cols="30"
                    rows="5"
                    required
                  />
                  <ErrorMessage name="bio" component="div" />
                  <div className="my-2">
                    <button type="button" className="btn btn-light">
                      Add Social Network Links
                    </button>
                    <span>Optional</span>
                  </div>
                  <div className="social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <Field
                      type="text"
                      className="form-group social-input"
                      name="facebookLink"
                      placeholder="Facebook URL"
                    />
                    <ErrorMessage name="facebookLink" component="div" />
                  </div>
                  <div className="social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <Field
                      type="text"
                      className="social-input"
                      name="youtubeLink"
                      placeholder="YouTube URL"
                    />
                    <ErrorMessage name="youtubeLink" component="div" />
                  </div>
                  <div className="social-input">
                    <i className="fab fa-linkedin  fa-2x"></i>
                    <Field
                      type="text"
                      className="form-group social-input"
                      name="linkedinLink "
                      placeholder="Linkedin URL"
                    />
                    <ErrorMessage name="linkedinLink" component="div" />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>

                    <Field
                      type="text"
                      className="form-group social-input"
                      name="instagramLink"
                      placeholder="Instagram URL"
                    />
                    <ErrorMessage name="instagramLink" component="div" />
                  </div>

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
          ))}
        </section>
      ) : null}
    </>
  )
}

const mapDispatchToProps = {
  editProfileDispatch,
  loadUserProfile,
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
