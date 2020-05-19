import React, { useEffect, useState, useCallback } from "react"
import { connect } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"

function Profile({ id, profiles }) {
  const [userProfile, setUserProfile] = useState()

  const getProfile = useCallback(() => {
    console.log(Number(id))
    const test = profiles.filter((profile) => profile.id == id)
    console.log(test)

    setUserProfile(test)
    console.log({ userProfile })
  }, [userProfile])

  // const userData = () => {

  // }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      {userProfile ? (
        <>
          <a href="profiles.html" className="btn">
            Back To Profiles
          </a>
          {userProfile.map((profile) => (
            <div className="profile-grid my-1">
              {/* <!-- Top --> */}
              <div className="profile-top bg-primary p-2">
                <img
                  src={profile.image_url}
                  className="round-img my-1"
                  alt=""
                />
                <h1 className="large">{profile.full_name}</h1>

                {profile.current_job ? (
                  <p>
                    {" "}
                    {profile.professional_status} at {profile.current_job}{" "}
                  </p>
                ) : (
                  <p>{profile.professional_status}</p>
                )}

                <p>{profile.location}</p>
                <div className="icon my-1">
                  <a href={profile.website}>
                    <i className="fas fa-globe fa-2x"></i>
                  </a>
                  <a href={profile.twitter_link}>
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                  <a href={profile.linkedin_link}>
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                  <a href={profile.facebook_link}>
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>

                  <a href={profile.instagram_link}>
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                </div>
              </div>

              {/* <!-- About --> */}
              <div className="profile-about bg-light p-2">
                <h2 className="text-primary">John's Bio</h2>
                <p>{profile.bio}</p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                  {profile.skills ? (
                    profile.skills.map((skill, idx) => (
                      <div className="p-1">
                        <i className="fas fa-check"></i> {skill}
                      </div>
                    ))
                  ) : (
                    <li className="text-primary">
                      <i className="fas fa-check"></i>No Skills
                    </li>
                  )}
                </div>
              </div>

              {/* Experience   */}
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experiences</h2>
                <div>
                  <h3>Microsoft</h3>
                  <p>Oct 2011 - Current</p>
                  <p>
                    <strong>Position: </strong> Senior Developer
                  </p>
                  <p>
                    <strong>Description: </strong> Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Saepe cupiditate ex placeat
                    nisi hic a molestiae aperiam architecto nostrum praesentium.
                  </p>
                </div>
                <div>
                  <h3>Sun Microsystems</h3>
                  <p>OCt 2004 - Nov 2010</p>
                  <p>
                    <strong>Position: </strong> Systems Admin
                  </p>
                  <p>
                    <strong>Description: </strong> Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Saepe cupiditate ex placeat
                    nisi hic a molestiae aperiam architecto nostrum praesentium.
                  </p>
                </div>
              </div>

              {/* <!-- Education --> */}
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                <div>
                  <h3>University of Washington</h3>
                  <p>Sep 1993 - June 1999</p>
                  <p>
                    <strong>Degree: </strong> Masters
                  </p>
                  <p>
                    <strong>Field Of Study: </strong> Computer Science
                  </p>

                  <p>
                    <strong>Description: </strong> Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Saepe cupiditate ex placeat
                    nisi hic a molestiae aperiam architecto nostrum praesentium.
                  </p>
                </div>
              </div>

              {/* <!-- Githun Repos --> */}

              <div className="profile-github">
                <h2 className="text-primary my-1">
                  <i className="fab fa-github">Guthub Repos</i>
                </h2>
                <div className="repo bg-white my-1 p-1">
                  <div>
                    <h4>
                      <a href="#">Repo one</a>
                    </h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eum, autem!
                    </p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">Stars: 44</li>
                      <li className="badge badge-dark">Watchers: 20</li>
                      <li className="badge badge-light">Forks: 24</li>
                    </ul>
                  </div>
                </div>

                <div className="repo bg-white my-1 p-1">
                  <div>
                    <h4>
                      <a href="#">Repo Two</a>
                    </h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eum, autem!
                    </p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">Stars: 44</li>
                      <li className="badge badge-dark">Watchers: 20</li>
                      <li className="badge badge-light">Forks: 24</li>
                    </ul>
                  </div>
                </div>

                <div className="repo bg-white my-1 p-1">
                  <div>
                    <h4>
                      <a href="#">Repo Three</a>
                    </h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eum, autem!
                    </p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">Stars: 44</li>
                      <li className="badge badge-dark">Watchers: 20</li>
                      <li className="badge badge-light">Forks: 24</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
  }
}

const mapDispatchToProps = {
  loadProfiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
