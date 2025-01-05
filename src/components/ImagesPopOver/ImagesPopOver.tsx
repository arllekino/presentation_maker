import React, { useEffect, useRef } from 'react'
import styles from './ImagesPopOver.module.css'
import Button from '../Button/Button'
import ButtonInput from '../Button/ButtonInput'
import { v4 as uuid } from 'uuid'

type PopOverImageType = {
    url: string
    action: () => void
}

type PopOverProps = {
    className: string
    itemClassName: string
    action: () => void
    toggle: () => void
    onClose: () => void
    isOpen: boolean
    images: PopOverImageType[]
    text?: string
    icon?: {
        path: string
        className: string
    }
    search: {
        searchAction: (value: React.SetStateAction<string>) => void
        value: string
    }
    pageParams: {
        page: number
        setPage: (value: React.SetStateAction<number>) => void
    }
}

function ImagesPopOver(props: PopOverProps) {
    const popOverButton = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popOverButton.current && !popOverButton.current.contains(event.target as Node)) {
                props.onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])

    const onSearchChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.search.searchAction((event.target as HTMLInputElement).value)
    }

    return (
        <div className={styles.popOverButton} ref={popOverButton}>
            <Button
                className={props.className}
                action={() => {
                    props.toggle()
                    if (!props.isOpen) {
                        props.action()
                    }
                }}
                icon={props.icon}
                text={props.text}
            />

            <nav className={`${styles.popOver} ${props.isOpen ? styles.active : ''}`}>
                <div className={styles.panelBar}>
                    <ButtonInput
                        labelId={uuid()}
                        className={styles.inputSearch}
                        action={onSearchChange}
                        inputType='text'
                        value={props.search.value}
                        placeholder='Введите текст'
                    />
                    <div className={styles.navigation}>
                        <Button
                            className={styles.arrowLeftButton}
                            action={() => { props.pageParams.setPage(--props.pageParams.page) }}
                            icon={{
                                path: 'src/Assets/icon_arrow.svg',
                                className: styles.arrowLeft
                            }}
                        />
                        <span className={styles.pageNum}>{props.pageParams.page}</span>
                        <Button
                            className={styles.arrowRightButton}
                            action={() => { props.pageParams.setPage(++props.pageParams.page) }}
                            icon={{
                                path: 'src/Assets/icon_arrow.svg',
                                className: styles.arrowRight
                            }}
                        />
                    </div>
                </div>
                {props.images.map(image => {
                    return (
                        <div className={styles.itemWrapper} key={uuid()}>
                            <img
                                className={props.itemClassName}
                                src={image.url}
                                alt=''
                                onClick={() => {
                                    image.action()
                                    props.onClose()
                                }}
                            />
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}

export {
    ImagesPopOver,
    type PopOverImageType
}