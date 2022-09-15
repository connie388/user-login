import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import { useLocation } from "react-router-dom";
import PDFSinglePageReader from "./PDFSinglePageReader";

function PDFreader() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filename = queryParams.get("filename");

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="pdf-container">
      <Document file={filename} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages <= 3 ? (
          Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))
        ) : (
          <PDFSinglePageReader numPages={numPages} />
        )}
      </Document>
    </div>
  );
}
export default PDFreader;
