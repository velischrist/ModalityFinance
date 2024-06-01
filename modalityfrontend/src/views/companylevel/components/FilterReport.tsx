import { FormItem, FormContainer } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'

type Option = {
    value: string
    label: string
}

const options: Option[] = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Microsoft', label: 'Microsoft' },
]

const validationSchema = Yup.object().shape({
    select: Yup.string().required('Please select one!'),
})

type Props = {
    onSubmit: (companyId: string) => void
}

const FilterReport: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className="h-full">
            <Card
                className="h-full"
                header={<span>Select Company</span>}
                headerClass="font-semibold text-lg text-600"
                bodyClass="h-full"
            >
                <div className="max-h-[500px] overflow-y-auto p-4">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            select: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            onSubmit(values.select)
                            setSubmitting(false)
                        }}
                    >
                        {({ values, touched, errors }) => (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                        asterisk
                                        label="Select Company"
                                        invalid={
                                            errors.select && touched.select
                                        }
                                        errorMessage={errors.select}
                                    >
                                        <Field name="select">
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={options}
                                                    value={options.find(
                                                        (option) =>
                                                            option.value ===
                                                            values.select,
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value,
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <FormItem>
                                        <Button variant="solid" type="submit">
                                            Submit
                                        </Button>
                                    </FormItem>
                                </FormContainer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Card>
        </div>
    )
}

export default FilterReport
