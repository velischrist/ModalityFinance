import React from 'react'
import Tabs from '@/components/ui/Tabs'
import IncomeStatement from './IncomeStatement'
import BalanceSheet from './BalanceSheet'
import CashFlowStatement from './CashFlowStatement'
import ShareholdersEquity from './ShareholdersEquity'

const { TabNav, TabList, TabContent } = Tabs

type Props = {
    companyId: string
}

const ReportViews: React.FC<Props> = ({ companyId }) => {
    return (
        <div className="h-full w-full">
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1">Company Overview</TabNav>
                    <TabNav value="tab2">Income Statement</TabNav>
                    <TabNav value="tab3">Balance Sheet</TabNav>
                    <TabNav value="tab4">Cash Flow Statement</TabNav>
                    <TabNav value="tab5">Shareholders Equity</TabNav>
                </TabList>

                <div className="p-4">
                    <TabContent value="tab1">
                        {/* Company Overview content */}
                    </TabContent>
                    <TabContent value="tab2">
                        <IncomeStatement companyId={companyId} />
                    </TabContent>
                    <TabContent value="tab3">
                        <BalanceSheet companyId={companyId} />
                    </TabContent>
                    <TabContent value="tab4">
                        <CashFlowStatement companyId={companyId} />
                    </TabContent>
                    <TabContent value="tab5">
                        <ShareholdersEquity companyId={companyId} />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default ReportViews
