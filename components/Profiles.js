import React, { useEffect, useCallback, useState } from "react"
import { connect } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"
import Link from "next/link"
import ProfilesLoaded from "../utils/ProfilesLoaded"
import LoadingPage from "./presentational/LoadingPage"
import { Pagination } from "antd"

function Profiles({ profiles }) {
  const { profiles: allProfiles, loading } = profiles

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostsperPage] = useState(10)

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const currentProfiles = allProfiles
    ? allProfiles.slice(indexOfFirstPost, indexOfLastPost)
    : null

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
              {currentProfiles ? (
                <>
                  {currentProfiles.map((profile, idx) => (
                    <div className="profile bg-light" key={idx}>
                      <img
                        src={profile.image_url}
                        className="round-img profile-img "
                        alt=""
                      />
                      <div className="profiles-info">
                        <h2>{profile.full_name}</h2>

                        {profile.current_job ? (
                          <p>
                            {" "}
                            {profile.professional_status} at{" "}
                            {profile.current_job}{" "}
                          </p>
                        ) : (
                          <p>{profile.professional_status}</p>
                        )}

                        <p>{profile.location}</p>
                        <Link
                          href="/profile/[id]"
                          as={`/profile/${profile.id}`}
                        >
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
                  ))}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                      // postPerPage={postPerPage}
                      total={allProfiles.length}
                      defaultCurrent={currentPage}
                      // paginate={paginate}
                      onChange={paginate}
                      pageSize={postPerPage}
                      showSizeChanger={false}
                    />
                  </div>

                  {/* <Pagination defaultCurrent={1} total={50} /> */}
                </>
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
