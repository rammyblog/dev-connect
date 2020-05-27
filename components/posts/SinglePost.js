import React from "react"
import Link from "next/link"
import LikeBtn from "./LikeBtn"
import DislikeBtn from "./DislikeBtn"
import { connect } from "react-redux"

function SinglePost({ post, likes, dislikes, handleRemoveDislike }) {
  const { id, content, full_name, image, user } = post

  const handleDislikeClick = (id, user) => {
    console.log(id)
    handleRemoveDislike(id, user)
  }

  return (
    <>
      <div>
        <Link href="/profile/[id]" as={`/profile/${user}`}>
          <a href="profile.html">
            <img src={image} alt="" className="round-img" />
            <h4>{full_name}</h4>
          </a>
        </Link>
      </div>

      <div>
        <p className="my-1">{content}</p>
        {likes.map((like, idx) =>
          like.post === id ? (
            <LikeBtn
              key={idx}
              count={like.likes}
              user={user}
              userLiked={like.user}
            />
          ) : null
        )}

        {dislikes.map((dislike, idx) =>
          dislike.post === id ? (
            <DislikeBtn
              handleDislikeClick={handleDislikeClick}
              key={idx}
              count={dislike.dislikes}
              user={user}
              id={dislike.id}
            />
          ) : null
        )}

        <a href="post.html" className="btn btn-primary">
          Discussion
        </a>
      </div>
    </>
  )
}

export default SinglePost
