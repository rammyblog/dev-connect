import React from "react"

function LikeBtn({ count, userLiked, user }) {
  const finalArray = userLiked.map(function (obj) {
    return obj.id
  })

  const active = "btn btn-primary"
  const inactive = "btn"

  return (
    <>
      <button className={finalArray.includes(user) ? active : inactive}>
        <i className="fas fa-thumbs-up"></i> <span>{count}</span>
      </button>
    </>
  )
}

export default LikeBtn
