import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE_WITH_CARS, REMOVE_CAR } from '../../graphql/queries'

const RemoveCar = ({ id }) => {

    // console.log("hello form reoveCar component", id) -> OK. each car' id.

    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })

            // console.log("people from RemoveCar component", people)

            const filteredPeople = people.map(person => {
                if (person.id === removeCar.personId) {
                    return {
                        ...person,
                        cars: person.cars.filter(car => car.id !== removeCar.id)
                    }
                } else {
                    return person
                }
            })

            // console.log("filteredPeople from RemoveCar component", filteredPeople)

            cache.writeQuery({
                query: GET_PEOPLE_WITH_CARS,
                data: { people: filteredPeople}
            })
        },
    })

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete this car?")

        if (result) {
            removeCar({
                variables: {
                    id
                }
            })
        }
        // console.log("is this removed car variables? ->", id)
    }
    return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveCar