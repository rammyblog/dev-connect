import React from "react"

function DislikeBtn({ count, id, userDisLikes, handleDislikeClick, user }) {
  // console.log(userDisl)

  const active = "btn btn-primary"
  const inactive = "btn"

  return (
    <>
      <button
        className={userDisLikes.includes(postId) ? active : inactive}
        onClick={() => handleDislikeClick(id, user)}
      >
        <i className="fas fa-thumbs-down"></i> <span>{count}</span>
      </button>
    </>
  )
}

export default DislikeBtn
