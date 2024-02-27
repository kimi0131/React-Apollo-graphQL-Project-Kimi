import SectionDivider from "./SectionDivider"

const Title = () => {
    const styles = getStyles()
    return (
        <>
            <h1 style={styles.title}>Welcome to Kimi's car ownership management website</h1>
            <SectionDivider section={""} />
        </>
    )
}

const getStyles = () => ({
    title: {
        fontSize: '32px',
        padding: '16px',
        marginBottom: '48px'
    }
})

export default Title