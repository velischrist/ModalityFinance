import Tabs from '@/components/ui/Tabs'
import {
    HiOutlineStar,
    HiOutlineDocumentReport,
    HiOutlineAdjustments,
} from 'react-icons/hi'
import { RiAiGenerate } from 'react-icons/ri'
import ExtractionTable from './ExtractionGrid'
import ExtractionTable1 from './ExtractionGrid1'
import PointListContent from './PointListContent'
import ChatComponent from '@/views/virtualanalyst/components/Chat'

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
                        Extracted Dummy
                    </TabNav>
                    <TabNav value="tab3" icon={<HiOutlineDocumentReport />}>
                        Extracted Data
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
                        <ExtractionTable1 />
                        {/* <ExtractionTable /> */}
                    </TabContent>
                    {/* <TabContent value="tab3">
                        {/* <ExtractionTable /> */}
                    {/* <ExtractionTable /> */}
                    {/* </TabContent> */}
                    <TabContent value="tab4">
                        <ChatComponent />
                        {/* <ExtractionTable /> */}
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default DocumentTools
