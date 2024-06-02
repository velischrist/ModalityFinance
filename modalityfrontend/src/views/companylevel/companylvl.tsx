import React, { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ReportSidebar from './components/ReportSidebar'
import ReportBody from './components/ReportBody'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi'

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
        // <div className="h-full flex flex-col">
        //     <div className="bg-white px-8 py-4 shadow-md">
        //         <div className="lg:flex items-center justify-between mb-4">
        //             <div className="flex items-center space-x-4">
        //                 <Link to="/previous-page">
        //                     <Button
        //                         variant="plain"
        //                         className="flex items-center"
        //                     >
        //                         <HiArrowLeft className="h-4 w-4" />
        //                     </Button>
        //                 </Link>
        //                 <h3 className="text-2xl font-bold mb-4 lg:mb-0">
        //                     Company Level Reporting
        //                 </h3>
        //             </div>
        //             <div className="flex flex-col md:flex-row md:items-center gap-1">
        //                 <Link
        //                     className="block lg:inline-block md:mb-0 mb-4"
        //                     to="/app/companies/company-new"
        //                 >
        //                     <Button
        //                         block
        //                         variant="solid"
        //                         size="sm"
        //                         icon={<HiPlusCircle />}
        //                     >
        //                         Add Company
        //                     </Button>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
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
        // </div>
    )
}

export default CompanyLvl
