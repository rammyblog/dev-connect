import Typed from "react-typed"
import Link from "next/link"
import { connect } from "react-redux"

function ErrorPage(props) {
  return (
    <>
      <div className="container text-center h-screen flex justify-center items-center flex-col padding-top ">
        <img className="img" src="./images/broken-link.png" />
        <h1 className="mt-5 mb-3">Something's not right...</h1>
        <br />
        <h4 className="mb-3">
          <Typed
            strings={[props.text]}
            typeSpeed={30}
            startDelay={1000}
            cursorChar={""}
          />
        </h4>
        <br />

        {props.PageNotFound ? (
          <Link href="/">
            <a className="text-teal-500 font-bold text-xl">Go back Home</a>
          </Link>
        ) : null}

        <style jsx>
          {`
            .img {
              width: 100px;
            }
            .margin {
              margin-top: 100px;
            }
            .flex {
              display: flex;
            }
            .h-screen {
              max-height: 100vh;
            }
            .justify-center {
              justify-content: center;
            }
            .items-center {
              align-items: center;
            }
            .flex-col {
              flex-direction: column;
            }
            .padding-top {
              padding-top: 4rem;
            }
          `}
        </style>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    apiStatus: state.api,
  }
}

export default ErrorPage
