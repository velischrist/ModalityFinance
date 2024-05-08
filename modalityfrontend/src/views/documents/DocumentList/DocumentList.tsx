import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import DocumentTable from './components/DocumentTable'
import DocumentTableTools from './components/DocumentTableTools'

injectReducer('salesDocumentList', reducer)

const DocumentList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h5 className="mb-4 lg:mb-0">Documents</h5>
                <DocumentTableTools />
            </div>
            <DocumentTable />
        </AdaptableCard>
    )
}

export default DocumentList
