import Link from "next/link"
import LikeBtn from "./LikeBtn"
import DislikeBtn from "./DislikeBtn"

function SinglePost({
  post,
  likes,
  dislikes,
  userLikes,
  userDislikes,
  handleRemoveDislike,
  handleRemoveLike,
  handleAddLike,
  handleAddDislike,
}) {
  const { id, content, full_name, image, user } = post

  const getLikeIdFromPostId = (postID) => {
    return likes.filter((like) => like.post === postID)[0].id
  }

  const getDislikeIdFromPostId = (postID) => {
    return dislikes.filter((dislike) => dislike.post === postID)[0].id
  }

  const handleDislikeClick = (postId) => {
    const likeID = getLikeIdFromPostId(postId)
    const dislikeID = getDislikeIdFromPostId(postId)

    if (userDislikes.includes(id)) {
      handleRemoveDislike(dislikeID)
    } else {
      if (userLikes.includes(id)) {
        handleRemoveLike(likeID)
        handleAddDislike(dislikeID)
      } else {
        handleAddDislike(dislikeID)
      }
    }
  }

  const handleLikeClick = (postId) => {
    const likeID = getLikeIdFromPostId(postId)
    const dislikeID = getDislikeIdFromPostId(postId)
    if (userLikes.includes(id)) {
      handleRemoveLike(likeID)
    } else {
      if (userDislikes.includes(id)) {
        handleRemoveDislike(dislikeID)
        handleAddLike(likeID)
      } else {
        handleAddLike(likeID)
      }
    }
  }

  return (
    <>
      <div>
        <Link href="/profile/[id]" as={`/profile/${user}`}>
          <a>
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
              userDislikes={userDislikes}
            />
          ) : null
        )}
        <Link href="/post/[id]" as={`/post/${id}`}>
          <a className="btn btn-primary">Discussion</a>
        </Link>
      </div>
    </>
  )
}

export default SinglePost
