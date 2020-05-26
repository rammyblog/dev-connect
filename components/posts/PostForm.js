import React, { useState } from "react"
import { useForm } from "../../hooks/useForm"
import Alert from "../presentational/alert"
import { addPostDispatch } from "../../redux/post/postActions"
import { connect } from "react-redux"

function PostForm({ addPostDispatch, error }) {
  const toggleShow = () => {
    setalertShow(false)
  }

  const [alertShow, setalertShow] = useState(true)

  const [values, handleChange] = useForm({
    content: "",
  })

  const handleSubmit = (e) => {
    const { content } = values

    e.preventDefault()
    addPostDispatch(content)
    setalertShow(error)
  }

  return (
    <>
      <div class="post-form-header bg-primary">
        {error ? (
          <Alert
            message={response}
            class_name={"alert-danger"}
            show={alertShow}
            toggleShow={toggleShow}
          />
        ) : null}
        <h3>Say Something</h3>
      </div>
      <form class="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="content"
          id=""
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={values.content}
          onChange={handleChange}
        ></textarea>
        <input type="submit" value="submit" class="btn btn-dark my-1" />
      </form>
    </>
  )
}

const mapDispatchToProps = {
  addPostDispatch,
}

function mapStateToProps(state) {
  return {
    error: state.posts.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
