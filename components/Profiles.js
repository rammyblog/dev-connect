import React, { useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"
import Link from "next/link"
import ProfilesLoaded from "../utils/ProfilesLoaded"
import LoadingPage from "./presentational/LoadingPage"

function Profiles({ profiles }) {
  const { profiles: allProfiles, loading } = profiles
  return (
    <>
      <section className="container">
        {allProfiles.length > 0 && !loading ? (
          <>
            <h1 className="large text-primary">Developers</h1>

            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and Connect with
              developers
            </p>

            <div className="profiles">
              {allProfiles ? (
                allProfiles.map((profile, idx) => (
                  <div className="profile bg-light" key={idx}>
                    <img src={profile.image_url} className="round-img" alt="" />
                    <div>
                      <h2>{profile.full_name}</h2>

                      {profile.current_job ? (
                        <p>
                          {" "}
                          {profile.professional_status} at {profile.current_job}{" "}
                        </p>
                      ) : (
                        <p>{profile.professional_status}</p>
                      )}

                      <p>{profile.location}</p>
                      <Link href="/profile/[id]" as={`/profile/${profile.id}`}>
                        <a className="btn btn-primary">View Profile</a>
                      </Link>
                    </div>
                    <ul>
                      {profile.skills
                        ? profile.skills.map((skill, idx) => (
                            <li className="text-primary" key={idx}>
                              <i className="fas fa-check" /> {skill}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                ))
              ) : (
                <LoadingPage />
              )}
            </div>
          </>
        ) : null}
      </section>
    </>
  )
}

const mapDispatchToProps = {
  loadProfiles,
  // getUserProfileEducations,
  // getUserProfileExperiences,
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
    educations: state.educations,
    experiences: state.experiences,
  }
}

export default ProfilesLoaded(
  connect(mapStateToProps, mapDispatchToProps)(Profiles)
)
