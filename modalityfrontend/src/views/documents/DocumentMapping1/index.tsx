// mapping1.tsx

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import DocumentTools from './components/DocumentTools'
import PDFViewer from './components/PdfPreview'

const mapping1 = () => {
    // const filePath = `${process.env.PUBLIC_URL}/FY23_Q4_Consolidated_Financial_Statements.pdf` // Adjust the path to your PDF file

    const [horizontalOpen, setHorizontalOpen] = useState(false)

    const onHorizontalOpen = () => {
        setHorizontalOpen(true)
    }

    const onDrawerClose = () => {
        setHorizontalOpen(false)
    }

    const Title = (
        <div className="flex justify-between items-center w-full">
            <div>
                <h4 className="mb-2">Document Mapping</h4>
                <p>Map the document</p>
            </div>
            <div className="">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={() => onDrawerClose()}
                >
                    Cancel
                </Button>
                <Button variant="solid" onClick={() => onDrawerClose()}>
                    Okay
                </Button>
            </div>
        </div>
    )

    return (
        <div>
            <Button variant="twoTone" onClick={() => onHorizontalOpen()}>
                Horizontal Drawer
            </Button>

            <Drawer
                title={Title}
                onClose={onDrawerClose}
                isOpen={horizontalOpen}
                placement="bottom"
                closable={false}
                height="100%"
            >
                <div className="flex">
                    <div className="flex-1 max-h-screen sticky top-0 overflow-y-auto p-4 flex-col min-w-[360px] ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600 ">
                        {/* Left Side Content */}
                        <DocumentTools />
                    </div>
                    <div className="flex-1 w-1/2 h-full overflow-y-auto p-4">
                        {/* Right Side Content */}
                        <PDFViewer />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default mapping1
