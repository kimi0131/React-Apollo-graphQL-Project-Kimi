import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE_WITH_CARS, REMOVE_PERSON } from '../../graphql/queries'
import filter from 'lodash.filter'

const RemovePerson = ({ id }) => {

    // console.log("id from  RemovePerson component", id) -> OK

    const [ removePerson ] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { removePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE_WITH_CARS })
            // console.log("people from RemovePerson component", people)

            cache.writeQuery({
                query: GET_PEOPLE_WITH_CARS,
                data: {
                    people: filter(people, person => {
                        return person.id !== removePerson.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete this person?")

        if (result) {
            removePerson({
                variables: {
                    id
                }
            })
        }
    }
    return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemovePerson