import Tabs from '@/components/ui/Tabs'
import {
    HiOutlineStar,
    HiOutlineDocumentReport,
    HiOutlineAdjustments,
} from 'react-icons/hi'
import { RiAiGenerate } from 'react-icons/ri'
import ExtractionTable from './ExtractionGrid'
import PointListContent from './PointListContent'

const { TabNav, TabList, TabContent } = Tabs

const DocumentTools = () => {
    return (
        <div>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1" icon={<HiOutlineStar />}>
                        Highlights
                    </TabNav>
                    <TabNav value="tab2" icon={<HiOutlineDocumentReport />}>
                        Extracted Data
                    </TabNav>
                    <TabNav value="tab3" icon={<HiOutlineAdjustments />}>
                        Standardization
                    </TabNav>
                    <TabNav value="tab4" icon={<RiAiGenerate />}>
                        Virtual Analyst
                    </TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="tab1">
                        <PointListContent />
                        {/* <Highlights /> */}
                    </TabContent>
                    <TabContent value="tab2">
                        <ExtractionTable />
                        {/* <ExtractionTable /> */}
                    </TabContent>
                    <TabContent value="tab3">
                        {/* <ExtractionTable /> */}
                        {/* <ExtractionTable /> */}
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default DocumentTools
