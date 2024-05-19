import DocumentForm, {
    FormModel,
    SetSubmitting,
} from '@/views/documents/DocumentForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesDocument } from '@/services/SalesService'
import { companiesData } from '@/mock/data/salesData'
import companyEditSlice from '@/views/companies/CompanyEdit/store/companyEditSlice'
import companyListSlice from '@/views/companies/CompanyList/store/companyListSlice'
import { useParams } from 'react-router-dom';
import { Blob } from 'buffer'

// const { companyid } = useParams();

const DocumentNew = () => {
    const navigate = useNavigate()

    const { companyid: companyIdParam } = useParams<{ companyid?: string }>();
    const companyid = Number(companyIdParam);  // Convert to number

    // Optional: Handle case where companyid is not available or invalid
    if (!companyid) {
        // For example, navigate to an error page or show an error message.
        console.error('Invalid or missing companyId');
        navigate('/error');  // Assuming there's an error route setup
        return null;  // Prevent further rendering of this component
    }

    const addDocument = async (data: FormModel) => {
        const formData = new FormData();
        formData.append('documentname', data.documentname || '');
        console.log("testing")
        console.log("file: ", data.file)
        console.log("documentpath: ", data.documentpath)
        console.log("name: ", data.documentname)
        if (data.file) {
            console.log("hooray")
            formData.append('documentpath', data.file); // Ensure documentpath is a File
        }
        formData.append('companyid', String(data.companyid));
        formData.append('type', data.type || '');
        formData.append('status', data.status || '');

        const response = await apiCreateSalesDocument<boolean, FormData>(formData);
        return response.data;
        
        // const response = await apiCreateSalesDocument<boolean, FormModel>(data)
        // return response.data
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
                companyid={companyid}
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default DocumentNew
