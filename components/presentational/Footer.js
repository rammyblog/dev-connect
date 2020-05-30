export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="text-center">
          <span className="text-black">
            Built with
            <span
              className="text-red-600"
              style={{ padding: "0.25rem" }}
              aria-label="love"
              role="img"
            >
              ❤️ by
            </span>
          </span>
          <a
            href="https://github.com/rammyblog/dev-connect"
            rel="noopener noreferrer"
            target="_blank"
            className="text-teal-500 font-bold ml-1"
          >
            Onasanya Babatunde | <i className="fab fa-github"> Github Repo</i>
          </a>
        </div>
      </div>

      <style jsx>
        {`
          .footer {
            display: flex;
            justify-content: center;
            background: #282828;
            text-align: center;
            color: #fff;
            padding: 1rem;
          }
        `}
      </style>
    </>
  )
}
