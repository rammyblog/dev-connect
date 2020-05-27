import React from "react"

function DislikeBtn({
  count,
  id,
  userDislikes,
  handleDislikeClick,
  user,
  postId,
}) {
  // console.log(userDisl)

  const active = "btn btn-primary"
  const inactive = "btn"

  return (
    <>
      <button
        className={userDislikes.includes(postId) ? active : inactive}
        onClick={() => handleDislikeClick(postId)}
      >
        <i className="fas fa-thumbs-down"></i> <span>{count}</span>
      </button>
    </>
  )
}

export default DislikeBtn
