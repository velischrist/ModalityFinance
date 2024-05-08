import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import DocumentTableSearch from './DocumentTableSearch'
// import DocumentFilter from './DocumentFilter'
import { Link } from 'react-router-dom'

const DocumentTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <DocumentTableSearch />
            {/* <DocumentFilter /> */}
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/document-list.csv"
                target="_blank"
            >
                {/* <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button> */}
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/documents/document-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Upload Document
                </Button>
            </Link>
        </div>
    )
}

export default DocumentTableTools
