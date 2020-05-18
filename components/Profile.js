import React, { useEffect } from "react"

function Profile() {
  // useEffect(() => {}, [])
  return (
    <>
      <a href="profiles.html" className="btn">
        Back To Profiles
      </a>

      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            className="round-img my-1"
            alt=""
          />
          <h1 className="large">John Doe</h1>
          <p className="lead">Developer at Microsoft</p>
          <p>Seattle, WA</p>
          <div className="icon my-1">
            <a href="#">
              <i className="fas fa-globe fa-2x"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook fa-2x"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        {/* <!-- About --> */}
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">John's Bio</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos hic
            quas esse culpa! Ratione voluptatem recusandae, repellendus
            doloribus dolorum sit?
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            <div className="p-1">
              <i className="fas fa-check"></i> HTML
            </div>
            <div className="p-1">
              <i className="fas fa-check"></i> CSS
            </div>
            <div className="p-1">
              <i className="fas fa-check"></i> JavaScript
            </div>
            <div className="p-1">
              <i className="fas fa-check"></i> Python
            </div>
          </div>
        </div>

        {/* <!-- Experience  */}
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
              consectetur adipisicing elit. Saepe cupiditate ex placeat nisi hic
              a molestiae aperiam architecto nostrum praesentium.
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
              consectetur adipisicing elit. Saepe cupiditate ex placeat nisi hic
              a molestiae aperiam architecto nostrum praesentium.
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
              consectetur adipisicing elit. Saepe cupiditate ex placeat nisi hic
              a molestiae aperiam architecto nostrum praesentium.
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum,
                autem!
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum,
                autem!
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum,
                autem!
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
    </>
  )
}

export default Profile
