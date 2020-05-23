import React, { useCallback, useEffect } from "react"
import Link from "next/link"
import { connect } from "react-redux"
import { loadUserEducationsRecords } from "../redux/education/educationActions"
import { loadUserExperiencesRecords } from "../redux/experience/experienceActions"
import { loadUserProfile } from "../redux/profile/profileActions"

function UserDashboard({
  loadUserEducationsRecords,
  loadUserExperiencesRecords,
  educations,
  experiences,
  profile,
  loadUserProfile,
}) {
  const fetchData = useCallback(async () => {
    await loadUserExperiencesRecords()
    await loadUserEducationsRecords()
    if (profile.userProfile.length <= 0) {
      loadUserProfile()
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  // console.log(loading)

  const { loading: experienceLoading, userExperiences } = experiences
  const { loading: educationLoading, userEducations } = educations
  console.log(profile)
  const { userProfile } = profile
  return (
    <>
      {!experienceLoading ? (
        <section className="container">
          <h1 className="large text-primary">Dashboard</h1>

          <p className="lead">
            <i className="fas fa-user"></i>Welcome{" "}
            {userProfile.full_name ? userProfile.full_name : ""}
          </p>

          <div className="dash-buttons">
            <Link href="/edit-profile">
              <a className="btn">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </a>
            </Link>

            <Link href="/add-experience">
              <a className="btn">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
              </a>
            </Link>

            <Link href="/add-education">
              <a className="btn">
                <i className="fas fa-graduation-cap text-primary"></i> Add
                Education
              </a>
            </Link>
          </div>

          <h2 className="my-2">Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th className="hide-sm"></th>
              </tr>
            </thead>
            <tbody>
              {userExperiences
                ? userExperiences.map((experience, id) => (
                    <tr key={id}>
                      <td>{experience.company_name}</td>
                      <td className="hide-sm">{experience.job_title}</td>
                      <td className="hide-sm">
                        {experience.from_date} -
                        {experience.is_current
                          ? " Current"
                          : experience.to_date}
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <h2 className="my-2">Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th className="hide-sm"></th>
              </tr>
            </thead>
            <tbody>
              {userEducations
                ? userEducations.map((education, id) => (
                    <tr key={id}>
                      <td>{education.sch_name}</td>
                      <td className="hide-sm">{education.degree}</td>
                      <td className="hide-sm">
                        {education.from_date} -
                        {education.is_current ? " Current" : education.to_date}
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <div className="my-2">
            <button className="btn btn-danger">Delete My Account</button>
          </div>
        </section>
      ) : (
        "loadind"
      )}
    </>
  )
}

const mapDispatchToProps = {
  loadUserEducationsRecords,
  loadUserExperiencesRecords,
  loadUserProfile,
}

function mapStateToProps(state) {
  return {
    experiences: state.experience,
    educations: state.education,
    profile: state.profiles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)
