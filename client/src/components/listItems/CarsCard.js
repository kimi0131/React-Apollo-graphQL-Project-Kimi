import { useState } from "react"
import { Card } from "antd"
import RemoveCar from "../buttons/RemoveCar"
import UpdateCar from "../forms/UpdateCar"
import { EditOutlined } from "@ant-design/icons"

const CarsCard = props => {
    const [editMode, setEditMode] = useState(false)
    // console.log("props from CarsCard", props) -> OK (each car's info.)
    const { id, year, make, model, price, personId } = props

    const formatPriceToUSD = (price) => {
        // get USD format
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        return formatter.format(price);
    };

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
                <Card
                    style={{ backgroundColor: 'Highlight', margin: '16px' }}
                    key={props.index}
                    type="inner"
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />
                    ]}
                >
                    {`${year} ${make} ${model} -> ${formatPriceToUSD(price)}`}
                </Card>
            )
            }
        </div>
    )
}

export default CarsCard