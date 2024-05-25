import Tabs from '@/components/ui/Tabs'
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone } from 'react-icons/hi'
import ExtractionTable from './ExtractionTable'
import Highlights from './Highlights'
const { TabNav, TabList, TabContent } = Tabs

const DocumentTools = () => {
    return (
        <div>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1" icon={<HiOutlineHome />}>
                        Highlights
                    </TabNav>
                    <TabNav value="tab2" icon={<HiOutlineUser />}>
                        Data Points
                    </TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="tab1">
                        <Highlights />
                    </TabContent>
                    <TabContent value="tab2">
                        <ExtractionTable />
                        {/* <ExtractionTable /> */}
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default DocumentTools
