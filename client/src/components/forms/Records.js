import SectionDivider from "../layout/SectionDivider";
import People from "../lists/People";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE_WITH_CARS } from "../../graphql/queries";
import { Spin } from "antd";

const Records = () => {
    const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS);
    // console.log("Get People with Cars from Recors -> ", data.people)
    
    if (loading) return <Spin size="large" />
    if (error) return `Error! ${error.message}`

    return (
        <div>
            <SectionDivider section={"Records"} />
            <People people={data.people}/>
        </div>
    )
} 

export default Records