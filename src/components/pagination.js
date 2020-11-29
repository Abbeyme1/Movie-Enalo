import React from "react";

function pagination({ postsPerPage, totalPosts, paginate, current }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((page) => (
        <li
          key={page}
          className={current == page ? "page-item active" : "page-item"}
        >
          <span
            onClick={() => {
              paginate(page);
            }}
            className="page-link"
            style={{ cursor: "pointer" }}
          >
            {page}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default pagination;
