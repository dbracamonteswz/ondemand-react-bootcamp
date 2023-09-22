import React from "react";
import PropTypes from "prop-types";
const Pagination = ({ page, totalPages, handleSetPage }) => {
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button onClick={() => handleSetPage(prevPage)} className="btn-pagination" disabled={page == 1}>&laquo;</button>
        {[...Array(totalPages + 1)].map(
          (x, i) =>
            i != 0 && (
              <button
                key={i}
                className={i == page ? "btn-pagination active" : "btn-pagination"}
                onClick={() => handleSetPage(i)}
              >
                {i} {x}
              </button>
            )
        )}
        <button onClick={() => handleSetPage(nextPage)} className="btn-pagination" disabled={page === totalPages} >&raquo;</button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default Pagination;
