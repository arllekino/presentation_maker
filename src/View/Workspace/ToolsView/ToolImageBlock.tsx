import styles from '../Tools/Tools.module.css'
import { useTranslation } from 'react-i18next'
import ButtonInput from '../../../components/Button/ButtonInput'
import { v4 as uuid } from 'uuid'
import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import { useState } from 'react'
import Toggle from '../../../components/Toggle/Toggle'


function ToolImageBlock() {
    const { t } = useTranslation()
    const { setLocking } = useAppActions()
    const selectedSlideId = useAppSelector((state => state.selectedSlideIds[0]))
    const selectedBlockIds = useAppSelector((state => state.selectedBlockIds))
    const presentation = useAppSelector((state => state.presentation))
    const selectedBlock = useAppSelector((state => state.presentation.listSlides.get(selectedSlideId ?? '')?.blocks.find(block => block.id == selectedBlockIds[0])))
    const slide = presentation.listSlides.get(selectedSlideId || '')

    const { changeBlockPosition, resizeBlock, setRotationToBlock, setOpacityToBlock, makeImageBlockAsBackground } = useAppActions()

    const [isSizePositionToolOpen, setIsSizePositionToolOpen] = useState(false)
    const [isImageBlockBackground, setIsBackgroundImage] = useState(!!slide?.backgroundAsImageBlockId)

    if (!selectedSlideId || selectedBlockIds.length != 1) {
        return
    }

    if (!slide || !selectedBlock) {
        return
    }
    const slideObject = slide.blocks.find(object => {
        return object.id == selectedBlockIds[0]
    })

    if (!slideObject) {
        return
    }

    const onClickLock = () => {
        setLocking(!slideObject.isFixed)
    }

    const chevronStyle: React.CSSProperties = {
        transition: 'transform 0.5s ease',
        transform: `rotate(${isSizePositionToolOpen ? '0deg' : '-90deg'})`,
    }

    const setPosX: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newX = Number((event.target as HTMLInputElement).value)
        changeBlockPosition(newX, selectedBlock?.coordinates.y || 0)
    }

    const setPosY: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newY = Number((event.target as HTMLInputElement).value)
        changeBlockPosition(selectedBlock?.coordinates.x || 0, newY)
    }

    const setWidth: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = Number((event.target as HTMLInputElement).value)
        resizeBlock(newWidth, selectedBlock?.size.height ?? 100)
    }

    const setHeight: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = Number((event.target as HTMLInputElement).value)
        resizeBlock(selectedBlock?.size.width ?? 100, newHeight)
    }

    const setRotation: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRotate = Number((event.target as HTMLInputElement).value)
        setRotationToBlock(newRotate)
    }

    const setOpacity: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = Number((event.target as HTMLInputElement).value)
        setOpacityToBlock(newOpacity / 100)
    }

    const toggleImageBlockAsBackground = () => {
        setIsBackgroundImage(!isImageBlockBackground)
        if (!isImageBlockBackground) {
            makeImageBlockAsBackground(selectedBlock.id)
        } else {
            makeImageBlockAsBackground('')
        }
    }

    return (
        <>
            <div className={styles.toolTitleArea}>
                <span className={styles.toolTitle}>{t('image')}</span>
            </div>

            <div className={styles.toolMain}>

                <div className={styles.toolElementArea}>
                    <div className={styles.toolTextArea}>
                        <span className={styles.toolSubtitle}>
                            {t('sizeAndPosition')}
                            <img
                                src={slideObject.isFixed
                                    ? 'src/Assets/icon_locked.svg'
                                    : 'src/Assets/icon_unlocked.svg'
                                }
                                alt=''
                                className={styles.iconLock}
                                onClick={onClickLock}
                            />
                        </span>

                        <div className={styles.wrapperIconTextAreaChevron}>
                            <img
                                className={styles.iconTextAreaChevron}
                                style={chevronStyle}
                                src='src/Assets/icon_chevron_bottom.svg'
                                alt=''
                                onClick={() => setIsSizePositionToolOpen(!isSizePositionToolOpen)}
                            />
                        </div>
                    </div>

                    {isSizePositionToolOpen && (
                        <div className={styles.sizePositionUtils}>
                            <ButtonInput
                                labelId={uuid()}
                                className={styles.inputSizePosition}
                                action={setWidth}
                                value={String(Math.round(selectedBlock?.size.width ?? 0))}
                                inputType='number'
                                text='W'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={styles.inputSizePosition}
                                action={setHeight}
                                value={String(Math.round(selectedBlock?.size.height ?? 0))}
                                inputType='number'
                                text='H'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={styles.inputSizePosition}
                                action={setPosX}
                                value={String(Math.round(selectedBlock?.coordinates.x ?? 0))}
                                inputType='number'
                                text='X'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={styles.inputSizePosition}
                                action={setPosY}
                                value={String(Math.round(selectedBlock?.coordinates.y ?? 0))}
                                inputType='number'
                                text='Y'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={styles.inputSizePosition}
                                action={setRotation}
                                value={String(Math.round(selectedBlock?.rotation))}
                                inputType='number'
                                icon={{
                                    path: 'src/Assets/icon_rotate.svg',
                                    className: ''
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.toolUtilsArea}>
                    <Toggle
                        text={t('setAsBackground')}
                        value={isImageBlockBackground}
                        action={toggleImageBlockAsBackground}
                    />
                </div>

                <div className={styles.toolUtilsArea}>
                    <span className={styles.toolSubtitle}>
                        {t('opacity')}
                    </span>

                    <ButtonInput
                        labelId={uuid()}
                        className={styles.opacityInput}
                        action={setOpacity}
                        inputType='range'
                        value={String(selectedBlock?.opacity * 100)}
                    />
                </div>
            </div>
        </>
    )
}

export default ToolImageBlock