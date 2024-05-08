import DocumentForm, {
    FormModel,
    SetSubmitting,
} from '@/views/documents/DocumentForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesDocument } from '@/services/SalesService'

const DocumentNew = () => {
    const navigate = useNavigate()

    const addDocument = async (data: FormModel) => {
        const response = await apiCreateSalesDocument<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
    ) => {
        setSubmitting(true)
        const success = await addDocument(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Document successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/app/sales/document-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/document-list')
    }

    return (
        <>
            <DocumentForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default DocumentNew
