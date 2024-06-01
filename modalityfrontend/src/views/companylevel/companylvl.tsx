import React, { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ReportSidebar from './components/ReportSidebar'
import ReportBody from './components/ReportBody'

const CompanyLvl = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState)
    }

    const handleCompanyChange = (companyId: string) => {
        setSelectedCompany(companyId)
    }

    return (
        <AdaptableCard
            className="h-full overflow-hidden"
            bodyClass="p-0 h-full absolute inset-0 flex min-w-0 overflow-hidden"
        >
            <ReportSidebar
                isOpen={isSidebarOpen}
                onSubmit={handleCompanyChange}
            />
            <ReportBody
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                companyId={selectedCompany}
            />
        </AdaptableCard>
    )
}

export default CompanyLvl
