// FundFormControl.js
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'

type Option = {
    value: string
    label: string
}

type FormModel = {
    fundname: string
    select: string
    FundTypes: string[]
    date: Date | null
    time: Date | null
    singleCheckbox: boolean
    multipleCheckbox: Array<string | number>
    radio: string
    switcher: boolean
    segment: string[]
    upload: File[]
}

interface FundFormControlProps {
    onCloseDialog: () => void // Callback function to close the dialog
}

const options: Option[] = [
    { value: 'FoF', label: 'Funds of Funds' },
    { value: 'FO', label: 'Family Office' },
]

const validationSchema = Yup.object().shape({
    fundname: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please input user name!'),
    select: Yup.string().required('Please select one!'),
    FundTypes: Yup.array().min(1, 'At least one is selected!'),
    date: Yup.date().required('Date Required!').nullable(),
    time: Yup.date().required('Time Required!').nullable(),
    singleCheckbox: Yup.boolean().oneOf([true], 'You must tick this!'),
    multipleCheckbox: Yup.array().min(1, 'Select at least one option!'),
    radio: Yup.string().required('Please select one!'),
    switcher: Yup.boolean().oneOf([true], 'You must turn this on!'),
    segment: Yup.array().min(1, 'Select at least one option!'),
})

const FundFormControl = ({ onCloseDialog }: FundFormControlProps) => {
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    fundname: '',
                    select: '',
                    FundTypes: [],
                    date: null,
                    time: null,
                    singleCheckbox: false,
                    multipleCheckbox: [],
                    radio: '',
                    switcher: false,
                    segment: [],
                    upload: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values)
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                        onCloseDialog() // Call the closing function
                    }, 400)
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Fund Name"
                                invalid={errors.fundname && touched.fundname}
                                errorMessage={errors.fundname}
                            >
                                <Field
                                    type="text"
                                    name="fundname"
                                    placeholder="Fund Name"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label="Select Type(s)"
                                invalid={Boolean(
                                    errors.FundTypes && touched.FundTypes,
                                )}
                                errorMessage={errors.FundTypes as string}
                            >
                                <Field name="FundTypes">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select<Option, true>
                                            isMulti
                                            componentAs={CreatableSelect}
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={values.FundTypes}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option,
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem>
                                <div className="text-right mt-6">
                                    <Button
                                        type="reset"
                                        className="ltr:mr-2 rtl:ml-2"
                                        onClick={() => resetForm()}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        variant="plain"
                                        onClick={onCloseDialog}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        onClick={onCloseDialog}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FundFormControl
