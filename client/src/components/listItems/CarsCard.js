import { useState } from "react"
import { Card } from "antd"
import RemoveCar from "../buttons/RemoveCar"
import UpdateCar from "../forms/UpdateCar"
import { EditOutlined } from "@ant-design/icons"

const CarsCard = props => {
    const [editMode, setEditMode] = useState(false)
    const styles = getStyles()
    const { id, year, make, model, price, personId } = props

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />
                    ]}
                >
                    {year} {make} {model} {price} {personId}
                </Card>
            )
            }
        </div>
    )

}

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

export default CarsCard