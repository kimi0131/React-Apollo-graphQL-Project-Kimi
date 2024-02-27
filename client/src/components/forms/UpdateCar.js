import { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Spin } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_CAR } from '../../graphql/queries'
import { GET_PEOPLE_WITH_CARS } from '../../graphql/queries'

const UpdateCar = props => {

    // console.log("props from UpdateCar", props) 

    const { id, year, make, model, price, personId } = props
    // console.log("id from UpdateCar", personId)

    const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS)
    // console.log("data from UpdateCar", data)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [updateCar] = useMutation(UPDATE_CAR, {
        update: (cache, { data: { updateCar } }) => {
            const existingData = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })
            // console.log("existingData from updateCar", existingData.people)

            const selectedPersonInCache = existingData.people.find(person => person.id === updateCar.personId)
            // console.log("selectedPersonInCache from updateCar", selectedPersonInCache)

            const personWithUpdatedCar = {...selectedPersonInCache, cars: [...selectedPersonInCache.cars, updateCar]}

            const previousPersonInCache = existingData.people.find(person => person.id === personId)
            // console.log("previousPersonInCache from updateCar", previousPersonInCache)
            // console.log("personId from updateCar", personId)

            const personAwayCar = {...previousPersonInCache, cars: previousPersonInCache.cars.filter(car => car.id !== updateCar.id)}
            // console.log("updateCar", updateCar)

            cache.writeQuery({
                query: GET_PEOPLE_WITH_CARS,
                data: {
                    ...existingData,
                    people: existingData.people.map(person => {
                        if (person.id === updateCar.personId) {
                            return personWithUpdatedCar
                        } else if (person.id === personId) {
                            return personAwayCar
                        } else {
                            return person
                        }
                    })
                }
            })
        }
    })

    const onFinish = values => {
        const { year, make, model, personId } = values
        const parsePrice = parseFloat(values.price)

        if (isNaN(parsePrice)) {
            console.error('Price is not a number')
            return;
        }

        updateCar({
            variables: {
                id,
                UpdateCar: {
                    year: parseInt(year),
                    make,
                    model,
                    price: parsePrice,
                    personId
                }
            }
        })
        props.onButtonClick()
    }

    useEffect(() => {
        forceUpdate()
    }, [])


    if (loading) return <Spin size="large" />
    if (error) return `Error! ${error.message}`

    return (
        <>
            <h3>{`Editing... ${model} / ${make} / ${year}`}</h3>
            <Form
                name='update-car-form'
                layout='inline'
                onFinish={onFinish}
                initialValues={{
                    year: parseInt(year),
                    make,
                    model,
                    price: parseFloat(price),
                    personId
                }}
                form={form}
                style={{ gap: '16px' }}
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
                <Form.Item name='personId' rules={[{ required: true, message: 'Please select who own this car.' }]}>
                    <Select name="select"
                        options={data.people.map(person => ({
                            value: person.id,
                            label: `${person.firstName} ${person.lastName}`
                        }))}
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')) || form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Update Car Info
                        </Button>
                    )}
                </Form.Item>
                <Button onClick={props.onButtonClick}>Cancel</Button>
            </Form>
            <h3>-----------</h3>
        </>
    )
}

export default UpdateCar