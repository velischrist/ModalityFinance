import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'

const DocumentMapping = () => {
    const [horizontalOpen, setHorizontalOpen] = useState(false)

    const onHorizontalOpen = () => {
        setHorizontalOpen(true)
    }

    const onDrawerClose = () => {
        setHorizontalOpen(false)
    }

    const Title = (
        <div className="flex justify-between items-center w-full">
            <div>
                <h4 className="mb-2">Document Mapping</h4>
                <p>Map the document</p>
            </div>
            <div className="">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={() => onDrawerClose()}
                >
                    Cancel
                </Button>
                <Button variant="solid" onClick={() => onDrawerClose()}>
                    Okay
                </Button>
            </div>
        </div>
    )

    return (
        <div>
            <Button variant="twoTone" onClick={() => onHorizontalOpen()}>
                Horizontal Drawer
            </Button>

            <Drawer
                title={Title}
                onClose={onDrawerClose}
                isOpen={horizontalOpen}
                placement="bottom"
                closable={false}
                height="100%"
            >
                Drawer Content
            </Drawer>
        </div>
    )
}

export default DocumentMapping
