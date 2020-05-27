import Link from "next/link"

function SingleComment({ comment }) {
  const { image, content, full_name, user } = comment
  return (
    <>
      <div className="post bg-white p-1 my-1">
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
        </div>
      </div>
    </>
  )
}

export default SingleComment
