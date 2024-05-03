// LPFormControl.js
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
    lpname: string
    location: string
    LPTypes: string
}

interface LPFormControlProps {
    onCloseDialog: () => void // Callback function to close the dialog
}

const options: Option[] = [
    { value: 'FoF', label: 'Funds of Funds' },
    { value: 'FO', label: 'Family Office' },
]

const validationSchema = Yup.object().shape({
    lpname: Yup.string()
        .min(3, 'Too Short!')
        .required('Please input user name!'),
    location: Yup.string().required('Please input location!'),
    LPTypes: Yup.string().required('Please select one!')
})

const LPFormControl = ({ onCloseDialog }: LPFormControlProps) => {
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    lpname: '',
                    location: '',
                    LPTypes: ''
                }}
            
                validationSchema={validationSchema}
                
                onSubmit={(values, { setSubmitting }) => {
                    console.log("test")
                    const apiUrl = 'http://localhost:8000/api/lps/';
                
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Include other necessary headers such as authorization tokens
                        },
                        body: JSON.stringify({
                            lpname: values.lpname,
                            location: values.location,
                            type: values.LPTypes
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Record created successfully!');
                        onCloseDialog();
                        setSubmitting(false);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again.');
                        setSubmitting(false);
                    });
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="LP Name"
                                invalid={errors.lpname && touched.lpname}
                                errorMessage={errors.lpname}
                            >
                                <Field
                                    type="text"
                                    name="lpname"
                                    placeholder="LP Name"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label="Location"
                                invalid={errors.location && touched.location}
                                errorMessage={errors.location}
                            >
                                <Field
                                    type="text"
                                    name="location"
                                    placeholder="Add location"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label="Select Type"
                                invalid={errors.LPTypes && touched.LPTypes}
                                errorMessage={errors.LPTypes}
                            >
                                <Field name="LPTypes">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) => 
                                                    option.label ===
                                                values.LPTypes
                                            )}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.label
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

export default LPFormControl
