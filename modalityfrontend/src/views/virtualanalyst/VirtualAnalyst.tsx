import TopSection from './components/TopSection'
import ChatComponent from './components/Chat'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('virtualAnalyst', reducer)

const VirtualAnalyst = () => {
    return (
        <div>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Virtual Analyst</h3>
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
                </div>
            </div>
            {/* <TopSection /> */}
            <Container>
                <ChatComponent />
            </Container>
        </div>
    )
}

export default VirtualAnalyst
