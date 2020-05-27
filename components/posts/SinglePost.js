import React from "react"
import Link from "next/link"
import LikeBtn from "./LikeBtn"
import DislikeBtn from "./DislikeBtn"

function SinglePost({
  post,
  likes,
  dislikes,
  userLikes,
  userDisLikes,

  handleRemoveDislike,
  handleRemoveLike,
  handleAddLike,
  handleAddDislike,
}) {
  const { id, content, full_name, image, user } = post

  const handleDislikeClick = (likeId, user) => {
    if (userDislikes.includes(id)) {
      handleRemoveDislike(likeId)
    } else if (!userLikes.includes(id)) {
      userLikes.includes(id)
        ? handleRemoveLike(likeId)
        : handleAddDislike(likeId)
    }
    handleRemoveDislike(likeId)
  }

  const handleLikeClick = (likeId, user) => {
    if (userLikes.includes(id)) {
      handleRemoveLike(likeId)
    } else if (!userLikes.includes(id)) {
      userDislikes.includes(id)
        ? handleRemoveDislike(likeId)
        : handleAddLike(likeId)
    }
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
              userLikes={userLikes}
              postId={id}
              handleLikeClick={handleLikeClick}
              id={like.id}
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
              postId={id}
              userDislikes={userDisLikes}
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
