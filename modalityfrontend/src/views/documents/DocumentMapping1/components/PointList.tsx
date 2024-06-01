// import ActionBar from './components/ActionBar'
import PointListContent from './PointListContent'
// import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from '../store'
import { injectReducer } from '@/store'

injectReducer('pointList', reducer)

const PointList = () => {
    return <PointListContent />
}

export default PointList
