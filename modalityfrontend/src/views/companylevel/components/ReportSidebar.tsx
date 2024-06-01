import React from 'react'
import FilterReport from './FilterReport'

type Props = {
    isOpen: boolean
    onSubmit: (companyId: string) => void
}

const ReportSidebar: React.FC<Props> = ({ isOpen, onSubmit }) => {
    return (
        <div
            className={`h-full relative ${
                isOpen ? 'w-1/4' : 'w-0'
            } transition-width duration-300`}
        >
            <FilterReport onSubmit={onSubmit} />
        </div>
    )
}

export default ReportSidebar
