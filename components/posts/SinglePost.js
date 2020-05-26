import React from "react"
import Link from "next/link"

function SinglePost({ post }) {
  const { id, content, likes, dislikes, full_name, image, user } = post
  return (
    <>
      <div class="post bg-white my-1">
        <div>
          <Link href="/profile/[id]" as={`/profile/${user}`}>
            <a href="profile.html">
              <img src={image} alt="" class="round-img" />
              <h4>{full_name}</h4>
            </a>
          </Link>
        </div>

        <div>
          <p class="my-1">{content}</p>
          <button class="btn">
            <i class="fas fa-thumbs-up"></i> <span>{likes}</span>
          </button>
          <button class="btn">
            <i class="fas fa-thumbs-down"></i> <span>{dislikes}</span>
          </button>
          <a href="post.html" class="btn btn-primary">
            Discussion
          </a>
        </div>
      </div>
    </>
  )
}

export default SinglePost
