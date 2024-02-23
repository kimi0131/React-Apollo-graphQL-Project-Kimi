import { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON } from '../../graphql/queries'

const UpdatePerson = props => {
    const {id, firstName, lastName} = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [updatePerson] = useMutation(UPDATE_PERSON)

    const onFinish = values => {
        const {firstName, lastName} = values

        updatePerson({
            variables: {
                id,
                UpdatePerson: {
                    firstName,
                    lastName
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
            name='update-contact-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                firstName,
                lastName
            }}
            form={form}
        >
            <Form.Item name='firstName' rules={[{ required: true, message: 'Please enter a first name.'}]}>
                <Input placeholder="i.e. John"></Input>
            </Form.Item>
            <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name.'}]}>
                <Input placeholder="i.e. Smith"></Input>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldsTouched('firstName') && !form.isFieldsTouched('lastName')) || form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Contact
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson