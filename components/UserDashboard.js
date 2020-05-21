import React, { useCallback, useEffect } from "react"
import Link from "next/link"
import { connect } from "react-redux"
import { loadUserEducationsRecords } from "../redux/education/educationActions"
import { loadUserExperiencesRecords } from "../redux/experience/experienceActions"

function UserDashboard({
  loadUserEducationsRecords,
  loadUserExperiencesRecords,
  educations,
  experiences,
}) {
  const fetchData = useCallback(async () => {
    await loadUserExperiencesRecords()
    await loadUserEducationsRecords()
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  // console.log(loading)

  const { loading: experienceLoading, userExperiences } = experiences
  const { loading: educationLoading, userEducations } = educations

  console.log({ userExperiences })

  return (
    <>
      {!experienceLoading ? (
        <section class="container">
          <h1 class="large text-primary">Dashboard</h1>

          <p class="lead">
            <i class="fas fa-user"></i>Welcome John Doe
          </p>

          <div class="dash-buttons">
            <Link href="/create-profile">
              <a class="btn">
                <i class="fas fa-user-circle text-primary"></i> Edit Profile
              </a>
            </Link>

            <Link href="/add-experience">
              <a class="btn">
                <i class="fab fa-black-tie text-primary"></i> Add Experience
              </a>
            </Link>

            <Link href="/add-education">
              <a class="btn">
                <i class="fas fa-graduation-cap text-primary"></i> Add Education
              </a>
            </Link>
          </div>

          <h2 class="my-2">Experience Credentials</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Company</th>
                <th class="hide-sm">Title</th>
                <th class="hide-sm">Years</th>
                <th class="hide-sm"></th>
              </tr>
            </thead>
            <tbody>
              {userExperiences.length > 0
                ? userExperiences.map((experience, id) => (
                    <tr key={id}>
                      <td>{experience.company_name}</td>
                      <td class="hide-sm">{experience.job_title}</td>
                      <td class="hide-sm">
                        {experience.from_date} -
                        {experience.is_current
                          ? " Current"
                          : experience.to_date}
                      </td>
                      <td>
                        <button class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <h2 class="my-2">Education Credentials</h2>
          <table class="table">
            <thead>
              <tr>
                <th>School</th>
                <th class="hide-sm">Degree</th>
                <th class="hide-sm">Years</th>
                <th class="hide-sm"></th>
              </tr>
            </thead>
            <tbody>
              {userEducations
                ? userEducations.map((education, id) => (
                    <tr key={id}>
                      <td>{education.sch_name}</td>
                      <td class="hide-sm">{education.degree}</td>
                      <td class="hide-sm">
                        {education.from_date} -
                        {education.is_current ? " Current" : education.to_date}
                      </td>
                      <td>
                        <button class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <div class="my-2">
            <button class="btn btn-danger">Delete My Account</button>
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
}

function mapStateToProps(state) {
  return {
    experiences: state.experience,
    educations: state.education,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)
