import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input} from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PEOPLE_WITH_CARS } from '../../graphql/queries'
import SectionDivider from '../layout/SectionDivider'

const AddPerson = () => {
    const [ id, setId ] = useState(uuidv4())
    const [ form ] = Form.useForm()
    const [ , forceUpdate ] = useState()
    const [ addPerson ] = useMutation(ADD_PERSON)

    useEffect(() => {
        forceUpdate({})
    }, [])

    // button submtion function
    const onFinish = values => {
        // console.log('on finish')
        const { firstName, lastName } = values
        // console.log("firstName", firstName)
        // console.log("lastName", lastName)

        addPerson({
            variables: {
                AddPerson: {
                    id,
                    firstName,
                    lastName, 
                    cars: [] // return empty array for cars.
                }
            },
            update: (cache, { data: { addPerson } }) => {
                const existingData = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })
                cache.writeQuery({
                    query: GET_PEOPLE_WITH_CARS,
                    data: {
                        ...existingData,
                        people: [...existingData.people, addPerson]
                    }
                })
            }
        })
        setId(uuidv4())
    }

    return (
        <div>
            <SectionDivider section={"Add Person"} />
            <Form
                name="add-person-form"
                layout='inline'
                size='large'
                style={{ marginBottom: '40px', marginTop: '40px', justifyContent: 'start', gap: '24px'}}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label='First Name'
                    name='firstName'
                    rules={[{ required: true, message: 'Please enter a first name' }]}
                >
                    <Input placeholder='first name' />
                </Form.Item>
                <Form.Item
                    label='Last Name'
                    name='lastName'
                    rules={[{ required: true, message: 'Please enter a last name' }]}
                >
                    <Input placeholder='last name' />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPerson