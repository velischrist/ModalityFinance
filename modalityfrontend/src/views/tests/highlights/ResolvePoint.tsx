import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik, FieldProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import FormCustomFormatInput from '@/components/shared/FormCustomFormatInput'
import FormPatternInput from '@/components/shared/FormPatternInput'
import * as Yup from 'yup'
import {
    updateKeyPointsData,
    closeEditKeyPointsDialog,
    useAppDispatch,
    useAppSelector,
} from '../../documents/DocumentMapping/store'
import React from 'react'

import Select from '@/components/ui/Select'

type Option = {
    value: string
    label: string
}
const options: Option[] = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]

type FormModel = {
    status: string //add resolved or non-resolved
    update: string //add an update on an insighht or question
}

const validationSchema = Yup.object().shape({
    status: Yup.string().required(
        'Select status type: Pending, Open or Resolved',
    ),
    update: Yup.string().required('This field is required'),
})

const ResolvePoints = () => {
    const dispatch = useAppDispatch()
    const point = useAppSelector((state) => state.keyPoints.data.selectedPoint)
    const data = useAppSelector((state) => state.keyPoints.data.keyPointsData)
    const dialogOpen = useAppSelector(
        (state) => state.keyPoints.data.editkeyPointsDialog,
    )
    const selectedPoint = useAppSelector(
        (state) => state.keyPoints.data.selectedPoint,
    )
    const onUpdateKeyPoints = (values: FormModel) => {
        let newData = cloneDeep(data) || []
        const { status, update } = values

        const updatedPoint = {
            status,
            update,
        }

        newData = newData.map((comment) => {
            if (comment.update === selectedPoint.update) {
                comment = { ...comment, ...updatedPoint }
            }
            return comment
        })

        onDialogClose()
        dispatch(updateKeyPointsData(newData))
    }
    const onDialogClose = () => {
        dispatch(closeEditKeyPointsDialog())
    }

    return (
        <Dialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Resolve Key Point</h4>
            <div className="mt-6">
                <Formik
                    initialValues={{
                        status: point.status || '',
                        update: point.update || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onUpdateKeyPoints(values)
                        setSubmitting(false)
                    }}
                >
                    {/* {({ touched, errors }) => ( */}
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Status"
                                // invalid={errors.status && touched.status}
                                // errorMessage={errors.status}
                            >
                                <Field name="status">
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
                                                    option.value ===
                                                    point.status,
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
                            <FormItem
                                label="Resolve Comment"
                                // invalid={
                                //     errors.update &&
                                //     touched.update
                                // }
                                // errorMessage={errors.update}
                            >
                                <Field
                                    type="textArea"
                                    autoComplete="off"
                                    name="update"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem className="mb-0 text-right">
                                <Button block variant="solid" type="submit">
                                    Update
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                    {/* )} */}
                </Formik>
            </div>
        </Dialog>
    )
}

export default ResolvePoints
