import { connect } from "react-redux"
import Alert from "../../presentational/alert"
import { useForm } from "../../../hooks/useForm"
import { useState } from "react"
import { addCommentDispatch } from "../../../redux/comments/CommentsAction"

function CommentForm({ addCommentDispatch, post_id }) {
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
    addCommentDispatch(content, post_id)
  }

  return (
    <>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="content"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={values.content}
          onChange={handleChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </>
  )
}

const mapDispatchToProps = {
  addCommentDispatch,
}

// function mapStateToProps(state) {
//   return {
//     error: state.error,
//   }
// }

export default connect(null, mapDispatchToProps)(CommentForm)
