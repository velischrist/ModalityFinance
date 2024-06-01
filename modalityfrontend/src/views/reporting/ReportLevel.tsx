import ActionBar from './components/ActionBar'
import ReportLevelContent from './components/ReportLevelContent'
// import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import ListItem from '../reporting/components/ListItem'
import reducer from './store'
// import { injectReducer } from '@/store'

// injectReducer('reportLevel', reducer)

const ReportLevel = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <ListItem />
            {/* <NewProjectDialog /> */}
        </Container>
    )
}

export default ReportLevel
