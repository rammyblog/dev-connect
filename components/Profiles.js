import React, { useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"
import Link from "next/link"
import ProfilesLoaded from "../utils/ProfilesLoaded"

function Profiles({ loadProfiles, profiles }) {
  // const getProfiles = useCallback(() => {
  //   loadProfiles()
  // }, [])

  // useEffect(() => {
  //   getProfiles()
  // }, [])
  return (
    <>
      <h1 className="large text-primary">Developer</h1>

      <p className="lead">
        <i className="fab fa-connectdevelop"></i>Browse and Connect with
        developers
      </p>
      <div className="profiles">
        {profiles
          ? profiles.map((profile, idx) => (
              <div className="profile bg-light" key={idx}>
                <img src={profile.image_url} className="round-img" alt="" />
                <div>
                  <h2>John Doe</h2>

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
                  {profile.skills ? (
                    profile.skills.map((skill, idx) => (
                      <li className="text-primary">
                        <i className="fas fa-check"></i>
                        {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-primary">
                      <i className="fas fa-check"></i>Null
                    </li>
                  )}
                </ul>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

const mapDispatchToProps = {
  loadProfiles,
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
  }
}

export default ProfilesLoaded(
  connect(mapStateToProps, mapDispatchToProps)(Profiles)
)
