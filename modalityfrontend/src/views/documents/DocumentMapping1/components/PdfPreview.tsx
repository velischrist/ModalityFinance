import React from 'react'
// import { Worker, Viewer } from '@react-pdf-viewer/core'
// import '@react-pdf-viewer/core/lib/styles/index.css'
// import '@/pdf-worker' // Import the custom worker configuration
// import { useParams, useLocation } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

type PDFViewerProps = {
    document: {
        id: number
        documentname: string
        documentpath?: string
        companyid: number
    }
    companyid: number
}

const PDFViewer: React.FC<PDFViewerProps> = ({ document, companyid }) => {
    // const { companyid: companyIdParam } = useParams<{ companyid?: string }>()
    // const companyid = Number(companyIdParam) // Convert to number

    const documentUrl = `http://127.0.0.1:8000/media/${document.documentpath}`

    return (
        <div>
            <h3>{document.documentname}</h3>
            <h3>Company ID: {companyid}</h3>
            {/* <h3>{companyid}</h3> */}
            <iframe
                src={documentUrl}
                width="100%"
                height="600px"
                title="PDF Viewer"
            />
            {/* <p>Company ID: {companyid}</p> */}
        </div>
    )
}

export default PDFViewer

// import React from 'react'

// const PdfViewer = () => {
//     const pdfUrl =
//         'http://127.0.0.1:8000/media/FY23_Q4_Consolidated_Financial_Statements_MWuAoNC.pdf'

//     return (
//         <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer" />
//     )
// }

// export default PdfViewer
