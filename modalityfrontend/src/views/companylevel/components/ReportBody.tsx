import React from 'react'
import { Button } from '@/components/ui'
import { HiOutlineMenu, HiOutlineMenuAlt2 } from 'react-icons/hi'
import ReportBodyHeader from './ReportBodyHeader'

type Props = {
    toggleSidebar: () => void
    isSidebarOpen: boolean
    companyId: string | null
}

const ReportBody: React.FC<Props> = ({
    toggleSidebar,
    isSidebarOpen,
    companyId,
}) => {
    return (
        <div className="flex-grow h-full relative">
            {/* <Button
                shape="circle"
                variant="plain"
                icon={isSidebarOpen ? <HiOutlineMenuAlt2 /> : <HiOutlineMenu />}
                onClick={toggleSidebar}
            /> */}
            <ReportBodyHeader companyId={companyId} />
        </div>
    )
}

export default ReportBody
