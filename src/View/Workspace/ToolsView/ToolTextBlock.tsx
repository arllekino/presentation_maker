import { useTranslation } from 'react-i18next'
import styles from '../Tools/Tools.module.css'
import ListButton from '../../../components/ListButton/ListButton'
import React, { useState } from 'react'
import Button from '../../../components/Button/Button'
import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import ButtonInput from '../../../components/Button/ButtonInput'
import { v4 as uuid } from 'uuid'
import { useGetFontFamilyListItems } from '../../../components/ListButton/Lists/FontFamilyList'
import { useGetFontWeightList } from '../../../components/ListButton/Lists/FontWeightList'
import { convertFontWeightToString } from '../../../Utils/ConvertFontWeightToString'
import { useGetTextStyleList } from '../../../components/ListButton/Lists/TextStyleList'
import { TextAlignment } from '../../../Types/SlideObjectTypes'

function ToolTextBlock() {
    const { setLocking } = useAppActions()

    const selectedSlideId = useAppSelector((state => state.selectedSlideIds[0]))
    const presentation = useAppSelector((state => state.presentation))
    const selectedBlockIds = useAppSelector((state => state.selectedBlockIds))
    const selectedBlock = useAppSelector((state => state.presentation.listSlides.get(selectedSlideId ?? '')?.blocks.find(block => block.id == selectedBlockIds[0])))

    const { changeBlockPosition, resizeBlock, setRotationToBlock, changeTextBlockFontColor, changeTextBlockFontSize, changeTextAlignment, setOpacityToBlock } = useAppActions()

    const { t, i18n } = useTranslation()
    const [isTextStyleSheetOpen, setIsTextStyleSheetOpen] = useState(false)
    const [isSizePositionToolOpen, setIsSizePositionToolOpen] = useState(false)
    const [isFontFamilyPopOverOpen, setFontFamilyPopOverOpen] = useState(false)
    const [isFontWeightPopOverOpen, setFontWeightPopOverOpen] = useState(false)
    const [textAlignment, setTextAlignment] = useState<TextAlignment>('left')

    const fontListItems = useGetFontFamilyListItems()
    const fontWeightItems = useGetFontWeightList()
    const textStyleListItem = useGetTextStyleList()

    if (!selectedSlideId || selectedBlockIds.length != 1 || !selectedBlock) {
        return
    }

    const slide = presentation.listSlides.get(selectedSlideId)
    if (!slide) {
        return
    }

    const slideObject = slide.blocks.find(object => {
        return object.id == selectedBlockIds[0]
    })

    if (!slideObject) {
        return
    }

    const currentFont = selectedBlock?.type == 'text_block' ? selectedBlock.font.family : ''
    const currentFontWeight = selectedBlock?.type == 'text_block' ? selectedBlock.font.weight : 400

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

    const setColorFont: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = (event.target as HTMLInputElement).value
        changeTextBlockFontColor(newColor)
    }

    const setSizeFont: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = Number((event.target as HTMLInputElement).value)
        changeTextBlockFontSize(newSize)
    }

    const setOpacity: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = Number((event.target as HTMLInputElement).value)
        setOpacityToBlock(newOpacity / 100)
    }

    let fontColor = '#000000'
    let fontSize = 14
    let fontWeight = 400
    if (selectedBlock?.type == 'text_block') {
        fontColor = selectedBlock.font.hexColor
        fontSize = selectedBlock.font.size
        fontWeight = selectedBlock.font.weight
    }

    return (
        <>
            <div className={styles.toolTitleArea}>
                <span className={styles.toolTitle}>{t('text')}</span>
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

                        <div className={styles.wrapperIconTextAreaChevron} style={{ backgroundColor: isSizePositionToolOpen ? '#ececec' : '' }}>
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
                    <span className={styles.toolSubtitle}>
                        {t('textStyle')}
                    </span>
                    <ListButton
                        className={styles.toolButton}
                        menuClassName={styles.menuToolButton}
                        action={() => setIsTextStyleSheetOpen(!isTextStyleSheetOpen)}
                        onClose={() => setIsTextStyleSheetOpen(false)}
                        text={getTextStyle(fontSize, fontWeight)}
                        listItem={textStyleListItem}
                        isOpen={isTextStyleSheetOpen}
                        icon={{
                            path: 'src/Assets/icon_chevron_bottom.svg',
                            className: styles.iconChevron,
                        }}
                    />
                </div>
                <div className={styles.toolUtilsArea}>
                    <span className={styles.toolSubtitle}>
                        {t('font')}
                    </span>

                    <ListButton
                        className={`${styles.toolButton} ${styles.fontToolButton}`}
                        menuClassName={styles.menuToolButton}
                        action={() => setFontFamilyPopOverOpen(!isFontFamilyPopOverOpen)}
                        onClose={() => setFontFamilyPopOverOpen(false)}
                        text={currentFont}
                        listItem={fontListItems}
                        isOpen={isFontFamilyPopOverOpen}
                    />

                    <div className={styles.fontColorSizeWeight}>
                        <ButtonInput
                            labelId={uuid()}
                            className=''
                            action={setColorFont}
                            inputType='color'
                            icon={{
                                path: 'src/Assets/icon_color_slide.svg',
                                className: styles.iconFontColor,
                                color: fontColor
                            }}
                        />

                        <ButtonInput
                            labelId={uuid()}
                            className=''
                            action={setSizeFont}
                            inputType='number'
                            value={String(fontSize)}
                        />

                        <ListButton
                            className={`${styles.toolButton} ${styles.fontToolButtonWeight}`}
                            menuClassName={styles.menuToolButton}
                            action={() => setFontWeightPopOverOpen(!isFontWeightPopOverOpen)}
                            onClose={() => setFontWeightPopOverOpen(false)}
                            text={convertFontWeightToString(currentFontWeight)}
                            listItem={fontWeightItems}
                            isOpen={isFontWeightPopOverOpen}
                        />
                    </div>

                </div>
                <div className={styles.toolUtilsArea}>
                    <span className={styles.toolSubtitle}>
                        {t('textAlignment')}
                    </span>
                    <div className={styles.textAlignment} dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}>
                        <Button
                            className={`${styles.textAlignmentItem} ${textAlignment == 'left' ? styles.selectedTextAlignment : ''}`}
                            action={() => {
                                changeTextAlignment('left')
                                setTextAlignment('left')
                            }}
                            icon={{
                                path: 'src/Assets/icon_text_left.png',
                                className: ''
                            }}
                        />
                        <Button
                            className={`${styles.textAlignmentItem} ${textAlignment == 'center' ? styles.selectedTextAlignment : ''}`}
                            action={() => {
                                changeTextAlignment('center')
                                setTextAlignment('center')
                            }}
                            icon={{
                                path: 'src/Assets/icon_text_center.png',
                                className: ''
                            }}
                        />
                        <Button
                            className={`${styles.textAlignmentItem} ${textAlignment == 'right' ? styles.selectedTextAlignment : ''}`}
                            action={() => {
                                changeTextAlignment('right')
                                setTextAlignment('right')
                            }}
                            icon={{
                                path: 'src/Assets/icon_text_right.png',
                                className: ''
                            }}
                        />
                        <Button
                            className={`${styles.textAlignmentItem} ${textAlignment == 'justify' ? styles.selectedTextAlignment : ''}`}
                            action={() => {
                                changeTextAlignment('justify')
                                setTextAlignment('justify')
                            }}
                            icon={{
                                path: 'src/Assets/icon_text_justify.png',
                                className: ''
                            }}
                        />
                    </div>
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

function getTextStyle(fontSize: number, fontWeight: number): string {
    if (fontSize >= 96) {
        return 'Title'
    }

    if (fontSize >= 48) {
        return 'Headline'
    }

    if (fontSize >= 32 && fontWeight == 700) {
        return 'Subheadline'
    }

    if (fontSize >= 32) {
        return 'Normal text'
    }

    return 'Small text'

}

export default ToolTextBlock