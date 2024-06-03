import { GlobalWorkerOptions } from 'pdfjs-dist'

// Set the workerSrc to use the locally bundled worker
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
