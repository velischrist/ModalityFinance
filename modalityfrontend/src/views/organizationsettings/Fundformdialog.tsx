// InternalScroll.js

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'

import FundFormControl from './Fundform'

const InternalScroll = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        console.log('onDialogClose')
        setIsOpen(false)
    }

    // const onDialogOk = () => {
    //     console.log('onDialogOk')
    //     setIsOpen(false)
    // }

    return (
        <div>
            <div className="lg:flex items-center justify-between mb-4">
                {' '}
                <h3 className="mb-4 lg:mb-0">Funds</h3>
                <Button variant="solid" onClick={() => openDialog()}>
                    Create Fund
                </Button>
            </div>

            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Create Fund</h5>
                    <div className="max-h-96 overflow-y-auto">
                        <FundFormControl onCloseDialog={onDialogClose} />
                    </div>
                    {/* <div className="text-right mt-6">
                        <Button variant="solid" onClick={onDialogOk}>
                            Close
                        </Button>
                    </div> */}
                </div>
            </Dialog>
        </div>
    )
}

export default InternalScroll
