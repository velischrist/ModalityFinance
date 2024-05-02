import TopSection from './components/TopSection'
import BodySection from './components/BodySection'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('virtualAnalyst', reducer)

const VirtualAnalyst = () => {
    return (
        <>
            <TopSection />
            <Container>
                <div className="mt-8 px-4">
                    <BodySection />
                </div>
            </Container>
        </>
    )
}

export default VirtualAnalyst
