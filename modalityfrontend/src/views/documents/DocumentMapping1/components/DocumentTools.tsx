import React from 'react'
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

type DocumentToolsProps = {
    document: {
        id: number
        documentname: string
        documentpath?: string
        companyid: number
    }
    companyid: number
}

const DocumentTools: React.FC<DocumentToolsProps> = ({
    document,
    companyid,
}) => {
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
                        <PointListContent
                        // document={document}
                        // companyid={companyid}
                        />
                    </TabContent>
                    <TabContent value="tab2">
                        <ExtractionTable
                        // document={document}
                        // companyid={companyid}
                        />
                    </TabContent>
                    <TabContent value="tab3">
                        <ExtractionTable1
                        // document={document}
                        // companyid={companyid}
                        />
                    </TabContent>
                    <TabContent value="tab4">
                        <ChatComponent
                        // document={document}
                        // companyid={companyid}
                        />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default DocumentTools
