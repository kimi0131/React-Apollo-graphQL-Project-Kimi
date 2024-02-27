import { useState } from "react"
import { Card } from "antd"
import { EditOutlined } from "@ant-design/icons"
import RemovePerson from "../buttons/RemovePerson"
import UpdatePerson from "../forms/UpdatePerson"
import CarsCard from "./CarsCard"
import { Link } from "react-router-dom"

const PeopleCard = props => {
    // console.log("props from PeopleCard", props) -> OK
    const [editMode, setEditMode] = useState(false)
    const { id, firstName, lastName, cars } = props

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
            {editMode ? (
                <UpdatePerson
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    cars={cars}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    style={{ maxWidth: '900px', textAlign: 'left', fontSize: '20px', margin: '24px'}}
                    title={`${firstName} ${lastName}`}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemovePerson id={id} />
                    ]}
                >
                    {cars.map((car, index) => (
                        <CarsCard 
                        key={index}
                            {...car}   
                        >
                        </CarsCard>
                    ))}
                    <Link to={`/person/${id}`}>
                        Learn More
                    </Link>
                </Card>
            )
            }
        </div>
    )
}

export default PeopleCard