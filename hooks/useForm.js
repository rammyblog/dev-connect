import { useState } from "react"

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  return [
    values,
    (e) => {
      if ([e.target.name] == "fromDate") {
        console.log("jgg")
      }
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    },
  ]
}
