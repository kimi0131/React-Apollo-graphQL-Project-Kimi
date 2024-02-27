import { Divider } from "antd";

const SectionDivider = ( props ) => {
  const { section } = props
  return <Divider style={{ fontSize: "32px" }}> {section} </Divider>
}

export default SectionDivider