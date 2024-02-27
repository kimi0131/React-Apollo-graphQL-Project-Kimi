import { useQuery } from "@apollo/client"
import { GET_PERSON_WITH_CARS } from "../graphql/queries"
import { Link, useParams } from "react-router-dom"
import { Card, Space, Spin } from "antd";

const ShowDetail = () => {
    // get the personId from the URL
    const personId = useParams();

    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: {id: personId.personId}
    })
    // console.log("personId from ShowDetail", personId.personId);  
    // console.log("data from ShowDetail component", data)

    const formatPriceToUSD = (price) => {
        // get USD format
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return formatter.format(price);
    };

    const person = data?.person;
    if (loading) return <Spin size="large" />
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            { person && 
                <Card style={{fontSize: '30px', margin: '50px'}}>
                    {`${person.firstName} ${person.lastName}'s cars`}
                    <Space direction="vertical" size={16} style={{width: '100%'}}>
                    {person.cars.length > 0 ? (
                        person.cars.map((car) => (
                            <Card
                                key={car.id}
                                type="inner"
                                title={`${car.year} ${car.make} ${car.mode}`}
                            >
                                {formatPriceToUSD(car.price)}
                            </Card>
                        ))
                    ) : (
                        <p>{`${person.firstName} ${person.lastName} does not have any car so far. Let's add cars!`}</p>
                    )}
                    <Link to={`/`}>Back to Home</Link>
                    </Space>
                </Card>
            }
        </div>
    )
}

export default ShowDetail