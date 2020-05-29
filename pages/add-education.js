import AddEducationForm from "../components/education/AddEducationForm"
import DynamicTitle from "../components/presentational/DynamicTitle"

function add_education() {
  return (
    <>
      <DynamicTitle title={"Add new Education"} />

      <AddEducationForm />
    </>
  )
}

export default add_education
