import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import CompanyTable from './components/CompanyTable'
import CompanyTableTools from './components/CompanyTableTools'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { HiPlusCircle } from 'react-icons/hi'

injectReducer('salesCompanyList', reducer)

const CompanyList = () => {
    return (
        <div>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Companies</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    {/* <Input
                    ref={inputRef}
                    size="sm"
                    placeholder="Search"
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={handleInputChange}
                /> */}
                    {/* <Tooltip title={view === 'grid' ? 'List view' : 'Grid view'}>
                    <Button
                        className="hidden md:flex"
                        variant="plain"
                        size="sm"
                        icon={
                            view === 'grid' ? (
                                <HiOutlineViewList />
                            ) : (
                                <HiOutlineViewGrid />
                            )
                        }
                        onClick={() => onViewToggle()}
                    />
                </Tooltip> */}
                    {/* <Tooltip title={`Sort: ${sort === 'asc' ? 'A-Z' : 'Z-A'}`}>
                    <Button
                        className="hidden md:flex"
                        variant="plain"
                        size="sm"
                        icon={
                            sort === 'asc' ? (
                                <HiOutlineSortAscending />
                            ) : (
                                <HiOutlineSortDescending />
                            )
                        }
                        onClick={onToggleSort}
                    />
                </Tooltip> */}
                    {/* <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onAddNewProject}
                >
                    New Project
                </Button> */}
                    <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/app/companies/company-new"
                    >
                        <Button
                            block
                            variant="solid"
                            size="sm"
                            icon={<HiPlusCircle />}
                        >
                            Add Company
                        </Button>
                    </Link>
                </div>
            </div>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="lg:flex items-center justify-between mb-4">
                    {/* <h3 className="mb-4 lg:mb-0">Companies</h3> */}
                    <CompanyTableTools />
                </div>
                <CompanyTable />
            </AdaptableCard>
        </div>
    )
}

export default CompanyList
