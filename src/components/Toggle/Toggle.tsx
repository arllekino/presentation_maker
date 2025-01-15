import styles from './Toggle.module.css'

type ToggleProps = {
    text: string,
    value: boolean
    action: () => void
}

function Toggle({text, value, action}: ToggleProps) {
    return (
        <div className={styles.toggle}>
            <span className={styles.text}>{text}</span>
            <label className={styles.switch}>
                <input type="checkbox" onChange={action} checked={value} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
}

export default Toggle