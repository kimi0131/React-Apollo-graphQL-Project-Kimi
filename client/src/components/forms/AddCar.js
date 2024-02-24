// import { from } from "@apollo/client"
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
// import { ADD_CAR, GET_CARS } from '../../graphql/queries'

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [addCar] = useMutation(ADD_PERSON)

    useEffect(() => {
        forceUpdate({})
    }, [])

    // button submtion function
    const onFinish = values => {
        // console.log('on finish')
        // destruction
        const { firstName, lastName } = values
        // console.log("firstName", firstName)
        // console.log("lastName", lastName)

        addCar({
            variables: {
                AddCar: {
                    id,
                    firstName,
                    lastName
                }
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
    }

    return (
        <Form
            name="add-car-form"
            layout='inline'
            size='large'
            style={{ marginBottom: '40px' }}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please enter car\'s year' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please enter a maker\'s name' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please enter your car model' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please enter your car\'s price' }]}
            >
                <Input/>
            </Form.Item>

            <Select options={[{ value: 'sample', label: <span>sample</span> }]} />;


            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>

    )
}

export default AddCar