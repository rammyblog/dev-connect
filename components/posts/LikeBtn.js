import React from "react"

function LikeBtn({ count, userLikes, user, id, handleLikeClick, postId }) {
  // const finalArray = userLiked.map(function (obj) {
  //   return obj.id
  // })

  const active = "btn btn-primary"
  const inactive = "btn"

  return (
    <>
      <button
        className={userLikes.includes(postId) ? active : inactive}
        onClick={() => handleLikeClick(postId)}
      >
        <i className="fas fa-thumbs-up"></i> <span>{count}</span>
      </button>
    </>
  )
}

export default LikeBtn
