import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import HeaderGoBack from '../CompanyEdit/headercompanyedit'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    industry: string
    companyname: string
    location: string
}

type AssetDetailsFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        industry: string
        [key: string]: unknown
    }
}

const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'energy', label: 'Energy' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'construction', label: 'Construction' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'aviation', label: 'Aviation' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'media', label: 'Media' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'banking', label: 'Banking' },
    { value: 'logistics', label: 'Logistics' },
    // Add more industries here...
]

const AssetDetailsFields = (props: AssetDetailsFieldsProps) => {
    const { values = { industry: '', tags: [] }, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <HeaderGoBack></HeaderGoBack>
            <h3 className="mb-5 lg:mb-5">Add New Company</h3>
            <h5>Asset Details</h5>
            <p className="mb-6">Add the company's details</p>

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
                <Field name="industry">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={industries}
                            value={industries.filter(
                                (industry) =>
                                    industry.value === values.industry,
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
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

export default AssetDetailsFields
