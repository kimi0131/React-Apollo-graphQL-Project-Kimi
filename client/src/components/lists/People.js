import { List } from "antd"
import PeopleCard from "../listItems/PeopleCard"

const People = ({ people }) => {
    // console.log("people comes from Records component", people)
    return (
        <List grid={{ gutter: 90, column: 1 }}>
            {people.map(({ id, firstName, lastName, cars}) => (
                <List.Item key={id}>
                    <PeopleCard 
                        id={id}
                        firstName={firstName}
                        lastName={lastName}
                        cars={cars}
                    >
                    </PeopleCard>
                </List.Item>
            ))}
        </List>
    )
}

export default People