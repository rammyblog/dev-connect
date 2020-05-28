import React, { useEffect, useState, useCallback } from "react"
import { connect, useStore } from "react-redux"
import { loadProfiles } from "../redux/profile/profileActions"
import ProfilesLoaded from "../utils/ProfilesLoaded"
import Link from "next/link"

import { getUserProfileEducations } from "../redux/education/educationActions"
import { getUserProfileExperiences } from "../redux/experience/experienceActions"
import SingleExperience from "./experience/singleExperience"
import SingleEducation from "./education/SingleEducation"
import axios from "axios"
import SingleGithubRepo from "./SingleGithubRepo"
import LoadingPage from "./presentational/LoadingPage"

function Profile({
  id,
  profiles,
  getUserProfileEducations,
  getUserProfileExperiences,
  experiences,
  educations,
}) {
  useEffect(() => {
    getProfile()
  }, [profiles])

  const [githubData, setgithubData] = useState(null)

  const fetchGithubRepos = useCallback(async (github_username) => {
    if (github_username) {
      const BASE_URL = `https://api.github.com/users/${github_username}/repos`

      try {
        const res = await axios.get(BASE_URL, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            sort: "updated",
          },
        })
        setgithubData(res.data.slice(0, 3))
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  const { profiles: allProfiles } = profiles

  const getProfile = () => {
    const singleProfile = allProfiles.filter((profile) => profile.id == id)
    getUserProfileEducations(id)
    getUserProfileExperiences(id)
    setUserProfile(singleProfile)
    const profileDetails = singleProfile.find((obj) => obj.id == id)

    if (profileDetails) {
      console.log(profileDetails)

      fetchGithubRepos(profileDetails.github_link)
    }
  }

  const [userProfile, setUserProfile] = useState(null)
  const { userExperiences } = experiences
  const { userEducations } = educations

  console.log(userExperiences)
  console.log(userEducations)

  return (
    <>
      {userProfile ? (
        <section className="container">
          <Link href="/profiles">
            <a className="btn">Back To Profiles</a>
          </Link>
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
                <h2 className="text-primary">
                  {profile.full_name.split(" ")[0]}'s Bio
                </h2>
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
                {userExperiences
                  ? userExperiences.map((exp, id) => (
                      <SingleExperience experience={exp} key={id} />
                    ))
                  : null}
              </div>

              {/* <!-- Education --> */}
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {userEducations
                  ? userEducations.map((edu, id) => (
                      <SingleEducation education={edu} key={id} />
                    ))
                  : null}
              </div>

              {/* <!-- Githun Repos --> */}

              <div className="profile-github">
                <h2 className="text-primary my-1">
                  <i className="fab fa-github"> Github Repos</i>
                </h2>
                {githubData && githubData.length > 0 ? (
                  githubData.map((data, idx) => (
                    <SingleGithubRepo data={data} key={idx} />
                  ))
                ) : (
                  <div className="empty-github">
                    <object
                      data="../images/empty.svg"
                      type="image/svg+xml"
                    ></object>
                    {/* <p>Nothing To see Here</p> */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <LoadingPage />
      )}
      <style jsx>
        {`
          .empty-github {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            height: 21rem;
          }

          object {
            width: 50%;
          }
        `}
      </style>
    </>
  )
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
    educations: state.education,
    experiences: state.experience,
  }
}

const mapDispatchToProps = {
  loadProfiles,
  getUserProfileEducations,
  getUserProfileExperiences,
}

export default ProfilesLoaded(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
)
