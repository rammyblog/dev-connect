import RegistrationForm from "../components/RegistrationForm"
import DynamicTitle from "../components/presentational/DynamicTitle"

function Registration() {
  return (
    <>
      <DynamicTitle title="Register A new account" />
      <RegistrationForm />
    </>
  )
}

export default Registration
