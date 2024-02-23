import { useQuery } from "@apollo/client"
import { GET_PEOPLE } from "../../graphql/queries"
import { List } from "antd"
import PeopleCard from "../listItems/PeopleCard"

const People = () => {
    const styles = getStyles()

    // get data from graphql. useQuerty() returns objects. so we pass the graphql query as an argument.
    const { loading, error, data } = useQuery(GET_PEOPLE)
    
    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

    console.log('get people data -> ', data)

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.people.map(({ id, firstName, lastName, cars}) => (
                <List.Item key={id}>
                    <PeopleCard 
                        id={id}
                        firstName={firstName}
                        lastName={lastName}
                        cars={cars}
                    ></PeopleCard>
                </List.Item>
            ))}
        </List>
    )
}

const getStyles = getStyles => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

export default People