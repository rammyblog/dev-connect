import { useState } from "react"

export default function Alert({ show, class_name, message, toggleShow }) {
  // const [show, setShow] = useState(true)
  // const toggleShow = () => {
  //   setShow(false)
  // }

  console.log(show)

  return (
    <div className={"alert " + (!show ? "d-none " : "display ") + class_name}>
      {message}{" "}
      <span onClick={() => toggleShow()} className={"close"}>
        X
      </span>{" "}
    </div>
  )
}
