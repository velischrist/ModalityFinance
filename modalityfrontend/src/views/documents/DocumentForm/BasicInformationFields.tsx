import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    documentName: string
    status: number
    uploadedAt: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic document information</p>
            <FormItem
                label="Document Name"
                invalid={
                    (errors.documentName && touched.documentName) as boolean
                }
                errorMessage={errors.documentName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="documentName"
                    placeholder="Document Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Status"
                invalid={(errors.status && touched.status) as boolean}
                errorMessage={errors.status}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="status"
                    placeholder="Status"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Uploaded at"
                invalid={(errors.uploadedAt && touched.uploadedAt) as boolean}
                errorMessage={errors.uploadedAt}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="uploadedAt"
                    placeholder="Uploaded at"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
