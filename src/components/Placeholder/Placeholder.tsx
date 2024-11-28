type PlaceholderProps = {
    text: string,
    scale?: number,
    action: () => void
}

function Placeholder({ text, scale, action }: PlaceholderProps) {
    const styles: React.CSSProperties = {
        margin: 0,
        paddingInline: '20%',
        paddingBlock: '22.3%', 
        fontSize: `${100 * (scale == undefined ? 1 : scale)}px`,
    }
    
    return (
        <p style={styles} onClick={action}>{text}</p>
    )
}

export default Placeholder