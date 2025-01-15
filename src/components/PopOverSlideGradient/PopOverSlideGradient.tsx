import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import styles from './PopOverSlideGradient.module.css'
import ButtonInput from '../Button/ButtonInput'
import { v4 as uuid } from 'uuid'
import { useAppSelector } from '../../Store/Hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { GradientPoint } from '../../Types/SlideType'
import { addPoint, deletePoint, setColorToPoint, startGradientPoints } from './GradientPointsUtils'
import { useAppActions } from '../../Store/Hooks/useAppActions'

type PopOverProps = {
    buttonClassName: string
    isOpen: boolean
    action: () => void
    onClose: () => void
    text?: string
    icon?: {
        path: string
        className: string
    }
}

function PopOverSlideGradient(props: PopOverProps) {
    const currentSlide = useAppSelector((state => state.presentation.listSlides.get(state.selectedSlideIds[0] || '')))
    const slideId = useAppSelector((state => state.selectedSlideIds[0]))
    const { setBackgroundGradientSlide, makeImageBlockAsBackground } = useAppActions()

    const button = useRef<HTMLDivElement>(null)

    const [angle, setAngleState] = useState(currentSlide?.background.type == 'gradient' ? currentSlide.background.angle : 0)
    const [points, setPoints] = useState<GradientPoint[]>(currentSlide?.background.type == 'gradient' ? currentSlide.background.points : startGradientPoints())
    const [currentPointPos, setCurrentPointPos] = useState(0)

    const { t } = useTranslation()

    const setAngle: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAngle = Number((event.target as HTMLInputElement).value)
        setAngleState(newAngle)
    }

    const setColorPoint: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = (event.target as HTMLInputElement).value
        setPoints(setColorToPoint(points, currentPointPos, newColor))
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (button.current && !button.current.contains(event.target as Node)) {
                props.onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])

    const barStyle: React.CSSProperties = {
        background: `linear-gradient(
            ${90}deg,
            ${points.map(point => `${point.color} ${point.range * 100}%`).join(', ')}
        )`
    }

    const previewStyle: React.CSSProperties = {
        background: `linear-gradient(
            ${angle}deg,
            ${points.map(point => `${point.color} ${point.range * 100}%`).join(', ')}
        )`
    }

    return (
        <div className={styles.wrapper} ref={button}>
            <Button
                className={props.buttonClassName}
                action={props.action}
                icon={props.icon}
                text={props.text}
            />
            <div className={`${styles.popOver} ${props.isOpen ? styles.active : ''}`}>
                <div className={styles.preview} style={previewStyle}></div>

                <div className={styles.utilsWrapper}>
                    <ButtonInput
                        labelId={uuid()}
                        className=''
                        wrapperClassName={styles.angle}
                        textClassName={styles.text}
                        action={setAngle}
                        text={t('angle')}
                        inputType='number'
                        value={String(angle)}
                    />

                    <div className={styles.separator}></div>

                    <div className={styles.utils}>
                        <div className={styles.settersPoint}>
                            <Button
                                className={styles.button}
                                action={() => setPoints(addPoint(points, setCurrentPointPos))}
                                text={t('addPoint')}
                            />

                            <Button
                                className={styles.button}
                                action={() => setPoints(deletePoint(points, setCurrentPointPos, currentPointPos))}
                                text={t('deletePoint')}
                            />
                        </div>

                        <ButtonInput
                            labelId={uuid()}
                            className=''
                            action={setColorPoint}
                            inputType='color'
                            value={points[currentPointPos].color}
                            icon={{
                                path: '',
                                className: styles.iconSetColorPoint,
                                color: points[currentPointPos].color
                            }}
                        />
                    </div>
                </div>

                <div className={styles.barPointWrapper}>
                    <div style={barStyle} className={styles.barPoint}></div>
                    {points.map((point, index) => {
                        const pointStyle: React.CSSProperties = {
                            backgroundColor: point.color,
                            marginInlineStart: `${point.range * 100}%`
                        }

                        if (index == currentPointPos) {
                            pointStyle.border = '1px solid #6B53FF'
                        }

                        return (
                            <div
                                key={uuid()}
                                style={pointStyle}
                                className={`${styles.point} ${(index == 0 || index == points.length - 1) ? styles.pointEdge : ''} ${index == points.length - 1 ? styles.pointLast : ''}`}
                                onClick={() => setCurrentPointPos(index)}
                            ></div>
                        )
                    })}
                </div>

                <Button
                    className={styles.setGradientButton}
                    action={() => {
                        setBackgroundGradientSlide(slideId || '', points, angle)
                        makeImageBlockAsBackground('')
                    }}
                    text={t('setGradient')}
                />
            </div>
        </div>
    )
}

export default PopOverSlideGradient