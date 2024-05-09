import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { FcFile } from 'react-icons/fc'

import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

const FileDropArea = () => {
    return (
        <Upload draggable>
            <div className="my-16 text-center">
                <div className="text-6xl mb-4 flex justify-center">
                    <FcFile />
                </div>
                <p className="font-semibold">
                    <span className="text-gray-800 dark:text-white">
                        Drop your files here, or{' '}
                    </span>
                    <span className="text-blue-500">browse</span>
                </p>
                <p className="mt-1 opacity-60 dark:text-white">
                    Support: pdf, xlsx, csv
                </p>
            </div>
        </Upload>
    )
}

const FileFormItem = ({ field, form }: FieldProps) => {
    return (
        <>
            <FileDropArea />
        </>
    )
}

// type Options = {
//     label: string
//     value: string
// }[]

type FormFieldsName = {
    uploadedAt: string
    documentName: string
    status: string
    type: string
    file: File | undefined
}

type DocumentDetailsFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: FormFieldsName
    setFieldValue: (
        field: string,
        value: File,
        shouldValidate?: boolean | undefined,
    ) => void
}

const statuses = [
    { value: 'Unspecified', label: 'Unspecified' },
    { value: 'Mapping pending', label: 'Mapping pending' },
    { value: 'Mapped', label: 'Mapped' },
    { value: 'Error', label: 'Error' },

    // Add more industries here...
]

const types = [
    { value: 'Unspecified', label: 'Unspecified' },
    { value: 'P&L Annual', label: 'P&L Annual' },
    { value: 'Cash Flow Analysis Annual', label: 'Cash Flow Analysis Annual' },
    { value: 'Year to Date Report', label: 'Year to Date Report' },
    { value: 'Monthly Report', label: 'Monthly Report' },
    { value: 'Annual Report', label: 'Annual Report' },
    { value: 'Quarterly Report', label: 'Quarterly Report' },

    // Add more industries here...
]

const DocumentDetailsFields = (props: DocumentDetailsFieldsProps) => {
    const {
        values = { status: '', type: '', tags: [] },
        touched,
        errors,
        setFieldValue,
    } = props

    // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0] // Get the uploaded file
    //     if (file) {
    //         setFieldValue('file', file) // Set the file field value in Formik
    //     }
    // }

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
                label="Type"
                invalid={(errors.type && touched.type) as boolean}
                errorMessage={errors.type}
            >
                <Field name="type">
                    {({ field, form }: FieldProps) => (
                        <Select
                            // isDisabled
                            field={field}
                            form={form}
                            options={types}
                            value={types.filter(
                                (type) => type.value === values.type,
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="Upload File"
                invalid={errors.file ? true : false}
                errorMessage={errors.file ? errors.file : undefined} // Use optional chaining to access error message
            >
                {/* <input
                    type="file"
                    onChange={handleFileUpload} // Call handleFileUpload function on file selection
                /> */}

                <Field name="file" component={FileFormItem}></Field>
            </FormItem>

            <FormItem
                label="Status"
                invalid={(errors.status && touched.status) as boolean}
                errorMessage={errors.status}
            >
                <Field name="status">
                    {({ field, form }: FieldProps) => (
                        <Select
                            isDisabled
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
                    disabled
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
