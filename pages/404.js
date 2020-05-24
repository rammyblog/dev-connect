import ErrorPage from "./_error"

export default function Custom404() {
  const text = "This page does not exist on this website"
  return <ErrorPage text={text} PageNotFound={true} />
}
