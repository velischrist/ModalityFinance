import React from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import Container from '@/components/shared/Container'
import ReportViews from './ReportViews'
import Button from '@/components/ui/Button'
import ReportAddNewView from './ReportAddNewView'
import { HiOutlineUserAdd, HiOutlineCog } from 'react-icons/hi'
// import { HiOutlineMenu, HiOutlineMenuAlt2 } from 'react-icons/hi'

type Props = {
    companyId: string | null
}

const ReportBodyHeader: React.FC<Props> = ({ companyId }) => {
    if (!companyId) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full text-center">
                <HiOutlineExclamationCircle className="text-6xl mb-4" />
                <h1 className="text-2xl font-bold">
                    Please select a company to view its reports
                </h1>
            </div>
        )
    }

    return (
        <div className="pt-8 h-full pb-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
            <Container className="px-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3>{companyId} Inc.</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" icon={<HiOutlineUserAdd />} />
                        <Button size="sm" icon={<HiOutlineCog />} />
                        <ReportAddNewView />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                    <ReportViews companyId={companyId} />
                    <div className="flex items-center gap-2"></div>
                </div>
            </Container>
        </div>
    )
}

export default ReportBodyHeader
