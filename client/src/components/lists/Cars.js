// import { useQuery } from "@apollo/client"
// import { GET_PERSON_WITH_CARS } from "../../graphql/queries"
// import { List } from "antd"
// import CarsCard from "../listItems/CarsCard"

// const Cars = () => {
//     const styles = getStyles()

//     // get data from graphql. useQuerty() returns objects. so we pass the graphql query as an argument.
//     const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS)
    
//     if(loading) return 'Loading...'
//     if(error) return `Error! ${error.message}`

//     console.log('get Cars data -> ', data)

//     return (
//         <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
//             {data.cars.map(({ id, year, make, model, price, personId }) => (
//                 <List.Item key={id}>
//                     <CarsCard 
//                         id={id}
//                         year={year}
//                         make={make}
//                         model= {model} 
//                         price={price}
//                         personId={personId}
//                     ></CarsCard>
//                 </List.Item>
//             ))}
//         </List>
//     )
// }

// const getStyles = getStyles => ({
//     list: {
//         display: 'flex',
//         justifyContent: 'center'
//     }
// })

// export default Cars