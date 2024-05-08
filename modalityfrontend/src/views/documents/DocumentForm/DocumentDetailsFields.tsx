import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type Options = {
    label: string
    value: number
}[]

type FormFieldsName = {
    uploadedAt: string
    documentName: string
    status: number
}

type DocumentDetailsFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        status: string
        [key: string]: unknown
    }
}

const statuses = [
    { value: '0', label: 'Mapping Pending' },
    { value: '1', label: 'Error' },
    { value: '2', label: 'Mapped' },

    // Add more industries here...
]

const DocumentDetailsFields = (props: DocumentDetailsFieldsProps) => {
    const { values = { status: '', tags: [] }, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Document Details</h5>
            <p className="mb-6">Add the documents details</p>

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
                <Field name="status">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={statuses}
                            value={statuses.filter(
                                (status) => status.value === values.status,
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="Uploaded At"
                invalid={(errors.uploadedAt && touched.uploadedAt) as boolean}
                errorMessage={errors.uploadedAt}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="uploadedAt"
                    placeholder="Uploaded At"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default DocumentDetailsFields
