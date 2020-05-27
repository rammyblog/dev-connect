import React from "react"

function DislikeBtn({ count, id, handleDislikeClick, user }) {
  return (
    <>
      <button className="btn" onClick={() => handleDislikeClick(id, user)}>
        <i className="fas fa-thumbs-down"></i> <span>{count}</span>
      </button>
    </>
  )
}

export default DislikeBtn
