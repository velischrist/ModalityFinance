import Button from '@/components/ui/Button'
// import { useDispatch } from 'react-redux'
// import { openDialog, updateDialogView } from '../store'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { RiAiGenerate } from 'react-icons/ri'

const ReportAddNewView = () => {
    // const dispatch = useDispatch()

    // const onAddNewColumn = () => {
    //     // dispatch(updateDialogView('NEW_COLUMN'))
    //     // dispatch(openDialog())
    // }

    return (
        <div>
            <Button
                size="sm"
                icon={<HiOutlinePlusCircle />}
                // onClick={onAddNewColumn}
            >
                <span>New View</span>
            </Button>
            <Button
                size="sm"
                icon={<RiAiGenerate />}
                // onClick={onAddNewColumn}
            >
                <span>Create Commentary</span>
            </Button>
        </div>
    )
}

export default ReportAddNewView
