import React from "react"
import AddExperienceForm from "../components/experience/AddExperienceForm"
import DynamicTitle from "../components/presentational/DynamicTitle"

function add_experience() {
  return (
    <>
      <DynamicTitle title={"Add new Experience"} />
      <AddExperienceForm />
    </>
  )
}

export default add_experience
