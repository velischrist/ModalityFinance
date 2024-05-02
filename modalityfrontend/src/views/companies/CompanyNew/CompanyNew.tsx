import CompanyForm, {
    FormModel,
    SetSubmitting,
} from '@/views/companies/CompanyForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesCompany } from '@/services/SalesService'

const CompanyNew = () => {
    const navigate = useNavigate()

    const addCompany = async (data: FormModel) => {
        const response = await apiCreateSalesCompany<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
    ) => {
        setSubmitting(true)
        const success = await addCompany(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Company successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/app/sales/company-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/company-list')
    }

    return (
        <>
            <CompanyForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default CompanyNew
