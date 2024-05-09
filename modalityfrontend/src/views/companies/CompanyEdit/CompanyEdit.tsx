import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import Tabs from '@/components/ui/Tabs'
import HeaderGoBack from './headercompanyedit'
import reducer, {
    getCompany,
    updateCompany,
    deleteCompany,
    useAppSelector,
    useAppDispatch,
} from './store'
import DocumentList from '../../documents/DocumentList'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import CompanyForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/companies/CompanyForm'
import isEmpty from 'lodash/isEmpty'

const { TabNav, TabList, TabContent } = Tabs

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

    const fetchData = (data: { companyid: number }) => {
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
        const success = 0;
        if (typeof companyData.companyid !== 'undefined') {
            const success = await deleteCompany({ companyid: companyData.companyid })
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
                Company successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            },
        )
        navigate('/app/sales/company-list')
    }

    useEffect(() => {
        const path = parseInt(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
        console.log(path)
        const rquestParam = { companyid: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(companyData) && (
                    <>
                        <div>
                            <HeaderGoBack></HeaderGoBack>
                            {/* <h3>{companyData.name}</h3> */}
                            <h3 className="mb-5 lg:mb-5">
                                {companyData.companyname}
                            </h3>
                            <Tabs defaultValue="tab1">
                                <TabList>
                                    <TabNav value="tab1">
                                        Company Updates
                                    </TabNav>
                                    <TabNav value="tab2">Details</TabNav>
                                    {/* <TabNav value="tab3">Agreements</TabNav>
                    <TabNav value="tab4">Meeting Calls</TabNav>
                    <TabNav value="tab5">Expert Calls</TabNav>
                    <TabNav value="tab6">Due Diligence Documents</TabNav> */}
                                </TabList>
                                <div className="p-4">
                                    <TabContent value="tab1">
                                        <DocumentList></DocumentList>
                                    </TabContent>
                                    <TabContent value="tab2">
                                        <CompanyForm
                                            type="edit"
                                            initialData={companyData}
                                            onFormSubmit={handleFormSubmit}
                                            onDiscard={handleDiscard}
                                            onDelete={handleDelete}
                                        />
                                    </TabContent>
                                    {/* <TabContent value="tab3"></TabContent> */}
                                    {/* <TabContent value="tab4">
                       
                    </TabContent>
                    <TabContent value="tab5">
                       
                    </TabContent>
                    <TabContent value="tab6">
                       
                    </TabContent> */}
                                </div>
                            </Tabs>
                        </div>
                        {/* <h3>{companyData.name}</h3>
                        <CompanyForm
                            type="edit"
                            initialData={companyData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        /> */}
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
