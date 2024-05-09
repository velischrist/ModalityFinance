import { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import {
    getCompanies,
    setFilterData,
    initialTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'

type FormModel = {
    companyname: string
    industry: string
    location: string
}

type FilterFormProps = {
    onSubmitComplete?: () => void
}

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete }, ref) => {
        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.salesCompanyList.data.filterData,
        )

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()
            dispatch(setFilterData(values))
            dispatch(getCompanies(initialTableData))
        }

        return (
            <Formik
                enableReinitialize
                innerRef={ref}
                initialValues={filterData}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                invalid={
                                    errors.companyname && touched.companyname
                                }
                                errorMessage={errors.companyname}
                            >
                                <h6 className="mb-4">Included text</h6>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Keyword"
                                    component={Input}
                                    prefix={
                                        <HiOutlineSearch className="text-lg" />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                invalid={touched.industry}
                                errorMessage={errors.industry as string}
                            >
                                <h6 className="mb-4">Company industry</h6>
                                <Field name="industry">
                                    {({ field, form }: FieldProps) => (
                                        <>
                                            <Checkbox.Group
                                                vertical
                                                value={[values.industry]}
                                                onChange={(options) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        options,
                                                    )
                                                }
                                            >
                                                <Checkbox
                                                    className="mb-3"
                                                    name={field.name}
                                                    value="Technology"
                                                >
                                                    Bags{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    className="mb-3"
                                                    name={field.name}
                                                    value="Healthcare"
                                                >
                                                    Healthcare{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    className="mb-3"
                                                    name={field.name}
                                                    value="Services"
                                                >
                                                    Services{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    className="mb-3"
                                                    name={field.name}
                                                    value="Travel"
                                                >
                                                    Travel{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    name={field.name}
                                                    value="Banking"
                                                >
                                                    Banking{' '}
                                                </Checkbox>
                                            </Checkbox.Group>
                                        </>
                                    )}
                                </Field>
                            </FormItem>

                            {/* <FormItem
                                invalid={errors.status && touched.status}
                                errorMessage={errors.status}
                            > */}

                            <FormItem
                                invalid={false}
                                errorMessage={"test"}
                            >
                                <h6 className="mb-4">Company Status</h6>
                                <Field name="status">
                                    {({ field, form }: FieldProps) => (
                                        <Radio.Group
                                            vertical
                                            value={"values.status"}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val,
                                                )
                                            }
                                        >
                                            <Radio value={0}>Open</Radio>
                                            <Radio value={1}>Closed</Radio>
                                            <Radio value={2}>Prospect</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    },
)

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Query
            </Button>
        </div>
    )
}

const CompanyFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => openDrawer()}
            >
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default CompanyFilter
