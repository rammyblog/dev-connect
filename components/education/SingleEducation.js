import React from "react"

function SingleEducation(props) {
  const {
    school,
    from_date,
    to_date,
    is_current,
    degree,
    desc,
    field_of_study,
  } = props.education

  return (
    <>
      <div>
        <h3>{school}</h3>
        <p>
          {from_date} - {is_current ? "Current" : to_date}
        </p>
        <p>
          <strong>Degree: </strong> {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong> {field_of_study}
        </p>

        <p>
          <strong>Description: </strong> {desc}
        </p>
      </div>
    </>
  )
}

export default SingleEducation
