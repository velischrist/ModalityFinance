import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteCompany,
    getCompanies,
    useAppDispatch,
    useAppSelector,
} from '../store'

const CompanyDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesCompanyList.data.deleteConfirmation,
    )
    const selectedCompany = useAppSelector(
        (state) => state.salesCompanyList.data.selectedCompany,
    )
    const tableData = useAppSelector(
        (state) => state.salesCompanyList.data.tableData,
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteCompany({ id: selectedCompany })

        if (success) {
            dispatch(getCompanies(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Company successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete company"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this company? All record related
                to this company will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default CompanyDeleteConfirmation
