import React from 'react'

const PDFViewer = () => {
    const fileUrl =
        'https://www.apple.com/newsroom/pdfs/fy2023-q4/FY23_Q4_Consolidated_Financial_Statements.pdf'

    return (
        <div className="pdf-viewer">
            <iframe
                title="PDF Viewer"
                src={`https://docs.google.com/viewer?url=${fileUrl}&embedded=true`}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="auto"
                allowFullScreen
            />
        </div>
    )
}

export default PDFViewer
