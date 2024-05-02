import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getCompany,
    updateCompany,
    deleteCompany,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import CompanyForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/companies/CompanyForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesCompanyEdit', reducer)

const CompanyEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const companyData = useAppSelector(
        (state) => state.salesCompanyEdit.data.companyData,
    )
    const loading = useAppSelector(
        (state) => state.salesCompanyEdit.data.loading,
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getCompany(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
    ) => {
        setSubmitting(true)
        const success = await updateCompany(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/company-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteCompany({ id: companyData.id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Company successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            },
        )
        navigate('/app/sales/company-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1,
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(companyData) && (
                    <>
                        <CompanyForm
                            type="edit"
                            initialData={companyData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(companyData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No company found!"
                    />
                    <h3 className="mt-8">No company found!</h3>
                </div>
            )}
        </>
    )
}

export default CompanyEdit
