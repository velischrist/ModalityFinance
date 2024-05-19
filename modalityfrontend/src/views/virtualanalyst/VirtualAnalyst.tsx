import TopSection from './components/TopSection'
import ChatComponent from './components/Chat'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('virtualAnalyst', reducer)

const VirtualAnalyst = () => {
    return (
        <div>
            <h1>Virtual Analyst</h1>
            {/* <TopSection /> */}
            <Container>
                <ChatComponent />
            </Container>
        </div>
    )
}

export default VirtualAnalyst;
