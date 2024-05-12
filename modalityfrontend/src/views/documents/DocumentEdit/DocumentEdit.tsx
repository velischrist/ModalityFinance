import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import HeaderGoBack from './headerdocumentedit'

import Tabs from '@/components/ui/Tabs'

import reducer, {
    getDocument,
    updateDocument,
    deleteDocument,
    useAppSelector,
    useAppDispatch,
} from './store'
import DocumentList from '../DocumentList'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import DocumentForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/documents/DocumentForm'
import isEmpty from 'lodash/isEmpty'

// const { TabNav, TabList, TabContent } = Tabs

injectReducer('salesDocumentEdit', reducer)

const DocumentEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const documentData = useAppSelector(
        (state) => state.salesDocumentEdit.data.documentData,
    )
    const loading = useAppSelector(
        (state) => state.salesDocumentEdit.data.loading,
    )

    const fetchData = (data: { id: number }) => {
        dispatch(getDocument(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
    ) => {
        setSubmitting(true)
        const success = await updateDocument(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/document-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = 0
        if (typeof documentData.id !== 'undefined') {
            const success = await deleteDocument({ id: documentData.id })
        }
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
                Document successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            },
        )
        navigate('/app/sales/document-list')
    }

    useEffect(() => {
        const path = parseInt(
            location.pathname.substring(location.pathname.lastIndexOf('/') + 1),
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(documentData) && (
                    <>
                        <div>
                            {/* <h3>{documentData.documentname}</h3> */}
                            <HeaderGoBack></HeaderGoBack>
                            <h3 className="mb-5 lg:mb-5">
                                {documentData.documentname}
                            </h3>
                            <DocumentForm
                                type="edit"
                                initialData={documentData}
                                onFormSubmit={handleFormSubmit}
                                onDiscard={handleDiscard}
                                onDelete={handleDelete}
                            />
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(documentData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No document found!"
                    />
                    <h3 className="mt-8">No document found!</h3>
                </div>
            )}
        </>
    )
}

export default DocumentEdit
