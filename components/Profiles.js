import React, { useEffect, useCallback } from "react"
import { connect } from "react-redux"

import { loadProfiles } from "../redux/profile/profileActions"

function Profiles({ loadProfiles, profiles }) {
  const getProfiles = useCallback(() => {
    loadProfiles()
  }, [])

  useEffect(() => {
    getProfiles()
  }, [])
  return (
    <>
      <h1 class="large text-primary">Developer</h1>

      <p class="lead">
        <i class="fab fa-connectdevelop"></i>Browse and Connect with developers
      </p>
      <div class="profiles">
        {profiles
          ? profiles.map((profile) => (
              <div class="profile bg-light">
                <img src={profile.image_url} class="round-img" alt="" />
                <div>
                  <h2>John Doe</h2>
                  <p>Developer at Microsoft</p>
                  <p>Seattle, WA</p>
                  <a class="btn btn-primary" href="profile.html">
                    View Profile
                  </a>
                </div>
                <ul>
                  <li class="text-primary">
                    <i class="fas fa-check"></i>HTML
                  </li>
                  <li class="text-primary">
                    <i class="fas fa-check"></i>CSS
                  </li>
                  <li class="text-primary">
                    <i class="fas fa-check"></i>JavaScript
                  </li>
                  <li class="text-primary">
                    <i class="fas fa-check"></i>Python
                  </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
