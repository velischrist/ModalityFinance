import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteDocument,
    getDocuments,
    useAppDispatch,
    useAppSelector,
} from '../store'

const DocumentDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesDocumentList.data.deleteConfirmation,
    )
    const selectedDocument = useAppSelector(
        (state) => state.salesDocumentList.data.selectedDocument,
    )
    const tableData = useAppSelector(
        (state) => state.salesDocumentList.data.tableData,
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteDocument({ documentId: selectedDocument })

        if (success) {
            dispatch(getDocuments(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Document successfuly deleted
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
            title="Delete Document"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this Document? All record
                related to this document will be deleted as well. This action
                cannot be undone.
            </p>
        </ConfirmDialog>
    )
}

export default DocumentDeleteConfirmation
