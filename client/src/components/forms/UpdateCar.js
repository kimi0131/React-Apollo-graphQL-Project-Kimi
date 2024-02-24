import { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_Car } from '../../graphql/queries'

const UpdateCar = props => {
    const { id, year, make, model, perice, personId } = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [updateCar] = useMutation(UPDATE_CAR)

    const onFinish = values => {
        const { year, make, model, perice, personId } = values

        updateCar({
            variables: {
                id,
                UpdateCar: {
                    year,
                    make,
                    model,
                    perice
                }
            }
        })
        props.onButtonClick()
    }

    useEffect(() => {
        forceUpdate()
    }, [])
    return (
        <Form
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year,
                make,
                model,
                perice
            }}
            form={form}
        >
            <Form.Item name='year' rules={[{ required: true, message: 'Please enter your car\'s year.' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='make' rules={[{ required: true, message: 'Please enter your car\'s maker.' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='model' rules={[{ required: true, message: 'Please enter your car\'s model.' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='price' rules={[{ required: true, message: 'Please enter your car\'s price.' }]}>
                <Input />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldsTouched('year') && !form.isFieldsTouched('make') && !form.isFieldsTouched('model') && !form.isFieldsTouched('price')) || form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car Info
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar