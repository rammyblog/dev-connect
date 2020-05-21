import React from "react"

export default function singleExperience(props) {
  const { company_name, from_date, position, desc } = props
  return (
    <>
      <div>
        <h3>{company_name}</h3>
        <p>{from_date} - Current</p>
        <p>
          <strong>Position: </strong> {position}
        </p>
        <p>
          <strong>Description: </strong> {desc}
        </p>
      </div>
    </>
  )
}
