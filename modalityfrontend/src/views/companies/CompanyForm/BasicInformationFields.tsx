import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    companyname: string
    industry: string
    location: string
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
            <p className="mb-6">Section to config basic company information</p>
            <FormItem
                label="Company Name"
                invalid={(errors.companyname && touched.companyname) as boolean}
                errorMessage={errors.companyname}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="companyname"
                    placeholder="Company Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Industry"
                invalid={(errors.industry && touched.industry) as boolean}
                errorMessage={errors.industry}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="industry"
                    placeholder="Industry"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Location"
                invalid={(errors.location && touched.location) as boolean}
                errorMessage={errors.location}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="location"
                    placeholder="Location"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
