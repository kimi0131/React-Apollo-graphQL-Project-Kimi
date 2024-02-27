import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Select } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CAR, GET_PEOPLE_WITH_CARS } from '../../graphql/queries'
import SectionDivider from '../layout/SectionDivider'
import { useQuery } from '@apollo/client'

const AddCar = () => {
    const [id, setId] = useState(uuidv4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [addCar] = useMutation(ADD_CAR)
    const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS)
    // console.log("data from AddCar component", data)

    // force update
    useEffect(() => {
        forceUpdate({})
    }, [])

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    // button submtion function (values are items from the form.)
    const onFinish = values => {
        // console.log('onFinish')

        // get each values with destruction.
        const { year, make, model, price } = values
        const personId = values.personId
        // console.log("personId", personId)

        addCar({
            variables: {
                AddCar: {
                    id,
                    year: parseInt(year),
                    make,
                    model,
                    price: parseFloat(price),
                    personId
                }
            },
            update: (cache, { data: { addCar } }) => {
                const existingData = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })
                // console.log('existingData of cars form addCar -> ', existingData.people)

                const selectedPersonInCache = existingData.people.find(person => person.id === addCar.personId)
                // console.log("selectedPersonInCache", selectedPersonInCache)  get a selected Person's info from the cache.

                const personWithNewCar = { ...selectedPersonInCache, cars: [...selectedPersonInCache.cars, addCar] }
                // console.log("personWithNewCar", personWithNewCar)

                cache.writeQuery({
                    query: GET_PEOPLE_WITH_CARS,
                    data: {
                        ...existingData,
                        people: existingData.people.map(person => {
                            if (person.id === addCar.personId) {
                                return personWithNewCar
                            } else {
                                return person
                            }
                        }
                        )
                    }
                })
            }
        })
        setId(uuidv4())
    }

    return (
        data.people.length === 0 
        ? <></>
        : 
        <div>
            <SectionDivider section={"Add Car"} />
            <Form
                name="add-car-form"
                layout='inline'
                size='large'
                style={{ marginBottom: '40px', marginTop: '40px', justifyContent: 'start', gap: '24px'}}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label='year'
                    name='year'
                    rules={[{ required: true, message: 'Please enter car\'s year' }]}
                >
                    <Input placeholder='year' />
                </Form.Item>

                <Form.Item
                    label='make'
                    name='make'
                    rules={[{ required: true, message: 'Please enter a maker\'s name' }]}
                >
                    <Input placeholder='make' />
                </Form.Item>
                <Form.Item
                    label='model'
                    name='model'
                    rules={[{ required: true, message: 'Please enter your car model' }]}
                >
                    <Input placeholder='model' />
                </Form.Item>
                <Form.Item
                    label='price'
                    name='price'
                    rules={[{ required: true, message: 'Please enter your car\'s price' }]}
                >
                    <Input placeholder='$' />
                </Form.Item>
                <Form.Item label='Person' name='personId' rules={[{ required: true, message: 'Please select who own this car.' }]}>
                    <Select name="select"
                        options={loading || error ? [] : data.people.map(person => ({
                            value: person.id,
                            label: `${person.firstName} ${person.lastName}`
                        }))}
                        placeholder="Select a person"
                    />
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
                            Add Car
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCar