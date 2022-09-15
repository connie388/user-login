import React, { useState } from "react";
import { Page } from "react-pdf/dist/umd/entry.webpack";

function PDFSinglePageReader({ numPages }) {
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show first page

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <div className="pdf-container">
      <p>
        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
      </p>

      <div>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          <i class="fa-solid fa-circle-arrow-left"></i>
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          <i class="fa-solid fa-circle-arrow-right"></i>
        </button>
      </div>
      <Page pageNumber={pageNumber} />
    </div>
  );
}

export default PDFSinglePageReader;
