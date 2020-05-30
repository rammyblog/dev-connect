const Pagination = ({ postPerPage, totalPost, currentPage, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number == currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
