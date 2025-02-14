import buttonStyles from './Button.module.css'

type ButtonProps = {
    labelId: string
    className: string
    action: (e: React.ChangeEvent<HTMLInputElement>) => void
    text?: string
    inputType: 'color' | 'file' | 'number' | 'text' | 'range'
    value?: string
    placeholder?: string
    wrapperClassName?: string
    textClassName?: string
    icon?: {
        path: string
        className: string
        color?: string
    }
}

function ButtonInput(buttonProps: ButtonProps) {
    const iconStyles: React.CSSProperties = {
        backgroundColor: buttonProps.icon?.color
    }

    return (
        <div className={`${buttonStyles.wrapper} ${buttonProps.wrapperClassName}`}>
            {buttonProps.inputType != 'text' && buttonProps.inputType != 'range' && (
                <label htmlFor={buttonProps.labelId} className={`${buttonStyles.labelButton} ${buttonProps.className}`}>
                    {buttonProps.text != undefined && (
                        <span className={`${buttonStyles.text} ${buttonProps.textClassName}`}>{buttonProps.text}</span>
                    )}
                    {buttonProps.icon != undefined && buttonProps.inputType != 'color' && (
                        <img src={buttonProps.icon.path} className={`${buttonStyles.defaultIcon} ${buttonProps.icon.className}`} style={iconStyles} alt="" />
                    )}
                    {buttonProps.icon != undefined && buttonProps.inputType == 'color' && (
                        <span className={`${buttonStyles.defaultIcon} ${buttonProps.icon.className}`} style={iconStyles}></span>
                    )}
                </label>)}
            {buttonProps.inputType == 'color' && (
                <input
                    type={buttonProps.inputType}
                    id={buttonProps.labelId}
                    className={buttonStyles.inputColor}
                    value={buttonProps.icon?.color}
                    onInput={buttonProps.action}
                />
            )}

            {buttonProps.inputType == 'file' && (
                <input
                    type={buttonProps.inputType}
                    id={buttonProps.labelId}
                    className={buttonStyles.inputFile}
                    onInput={buttonProps.action}
                />
            )}

            {buttonProps.inputType == 'number' && (
                <input
                    type={buttonProps.inputType}
                    id={buttonProps.labelId}
                    className={`${buttonStyles.inputText} ${buttonStyles.inputNumber}`}
                    value={buttonProps.value}
                    onInput={buttonProps.action}
                />
            )}

            {buttonProps.inputType == 'text' && (
                <input
                    type={buttonProps.inputType}
                    id={buttonProps.labelId}
                    className={buttonProps.className}
                    value={buttonProps.value}
                    onChange={buttonProps.action}
                    placeholder={buttonProps.placeholder}
                />
            )}

            {buttonProps.inputType == 'range' && (
                <input
                    type={buttonProps.inputType}
                    id={buttonProps.labelId}
                    className={buttonProps.className}
                    value={buttonProps.value}
                    onChange={buttonProps.action}
                />
            )}
        </div>
    )
}

export default ButtonInput