import buttonStyles from './Button.module.css'

type ButtonProps = {
    labelId: string
    className: string
    action: (e: React.ChangeEvent<HTMLInputElement>) => void
    text?: string
    inputType: 'color' | 'file'
    icon?: {
        path: string
        className: string
        color?: string
    }
}

function ButtonInput({ labelId, className, action, icon, text, inputType }: ButtonProps) {
    const iconStyles: React.CSSProperties = {
        backgroundColor: icon?.color
    }

    return (
        <>
            <label htmlFor={labelId} className={`${buttonStyles.labelButton} ${className}`}>
                {text != undefined && (
                    <span className={buttonStyles.text}>{text}</span>
                )}
                {icon != undefined && inputType != 'color' && (
                    <img src={icon.path} className={`${buttonStyles.defaultIcon} ${icon.className}`} style={iconStyles} alt="" />
                )}
                {icon != undefined && inputType == 'color' && (
                    <span className={`${buttonStyles.defaultIcon} ${icon.className}`} style={iconStyles}></span>
                )}
            </label>
            {inputType == 'color' && (
                <input
                    type={inputType}
                    id={labelId}
                    className={buttonStyles.inputColor}
                    value={icon?.color}
                    onChange={action}
                />
            )}

            {inputType == 'file' && (
                <input
                    type={inputType}
                    id={labelId}
                    className={buttonStyles.inputFile}
                    onInput={action}
                />

            )}
        </>
    )
}

export default ButtonInput