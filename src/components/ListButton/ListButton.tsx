import { useEffect, useRef } from 'react'
import Button from '../Button/Button'
import styles from './ListButton.module.css'
import { v4 as uuid } from 'uuid'

type ListItem = {
    text: string,
    action: () => void,
    icon?: {
        path: string,
        className: string
    }
}

type ButtonProps = {
    className: string
    action: () => void
    onClose: () => void
    text?: string
    listItem: ListItem[]
    isOpen: boolean
    style?: React.CSSProperties
    icon?: {
        path: string,
        className: string
    }
}

function ListButton(props: ButtonProps) {
    const listButton = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listButton.current && !listButton.current.contains(event.target as Node)) {
                props.onClose()
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])

    return (
        <div className={styles.listButton} ref={listButton}>
            <Button
                className={props.className}
                action={props.action}
                icon={props.icon}
                text={props.text}
            />
            <nav className={`${styles.menu} ${props.isOpen ? styles.active : ''}`}>
                <ul className={styles.list}>
                    {props.listItem.map((item) => {
                        return (
                            <li
                                key={uuid()}
                                className={styles.item}
                                onClick={() =>{
                                    item.action()
                                    props.onClose()
                                }}
                            >
                                {item.icon != undefined && <img src={item.icon.path} className={item.icon.className} />}
                                {item.text}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default ListButton
export type { ListItem }