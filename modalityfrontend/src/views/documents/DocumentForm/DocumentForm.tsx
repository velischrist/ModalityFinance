import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import DocumentDetailsFields from './DocumentDetailsFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { companiesData, documentsData } from '@/mock/data/salesData'
// import Instruments from './Instruments'
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: number
    documentname?: string
    documentpath?: File | null
    status?: string
    type?: string
    uploadedAt?: string
    file?: File
    companyid?: number
}
// type DocumentFormProps = {
//     companyid: number | undefined // Define the companyId prop type
// }
export type FormModel = Omit<InitialData, 'tags'> & {
    tags:
        | { label: string; value: string }[]
        | string[]
        | { label: string; value: number }[]
        | { label: string; value: File }[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
    companyid?: number
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    documentname: Yup.string().required('Document Name is required'),
    uploadedAt: Yup.string().required('Date is required'),
    status: Yup.string().required('Status is required'),
    type: Yup.string().required('Type is required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this document? All record
                    related to this document will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const currentDate = new Date().toISOString()
    const {
        type,
        initialData = {
            id: '',
            documentname: '',
            status: 'Mapping Pending',
            type: 'Unspecified',
            uploadedAt: currentDate,
            documentpath: null,
            file: null,
            companyid: props.companyid,
            // document: null,
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = parseInt(useUniqueId('product-'))

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)

                    if (type === 'new') {
                        formData.id = newId
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> */}
                            <div className="lg:col-span-2">
                                {/* <BasicInformationFields
                                    touched={touched}
                                    errors={errors}
                                /> */}
                                <DocumentDetailsFields
                                    touched={touched}
                                    errors={errors}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            {/* <div className="lg:col-span-1">
                                    <ProductImages values={values} />
                                </div> */}
                            {/* </div> */}
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.displayName = 'ProductForm'

export default ProductForm
