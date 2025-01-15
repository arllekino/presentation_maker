import buttonStyles from './Button.module.css'

type ButtonProps = {
    className: string
    action: () => void
    text?: string
    onRightClick?: () => void
    icon?: {
        path: string
        className: string
        color?: string
    }
}

function Button({ className, action, icon, text }: ButtonProps) {
    const iconStyles: React.CSSProperties = {
        backgroundColor: icon?.color
    }

    return (
        <button className={`${buttonStyles.defaultButton} ${className}`} onClick={action}>
            <>
                {icon != undefined && (
                    <img src={icon.path} className={`${buttonStyles.defaultIcon} ${icon.className}`} style={iconStyles} alt="" />
                )}

                {text != undefined && (
                    <span className={buttonStyles.text}>{text}</span>
                )}
            </>
        </button>
    )
}

export default Button