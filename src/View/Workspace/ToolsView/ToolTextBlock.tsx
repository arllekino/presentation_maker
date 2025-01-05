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

function ToolTextBlock() {
    const { raiseOverlayPriority, lowerOverlayPriority, setLocking } = useAppActions()

    const selectedSlideId = useAppSelector((state => state.selectedSlideId))
    const presentation = useAppSelector((state => state.presentation))
    const selectedBlockIds = useAppSelector((state => state.selectedBlockIds))
    const selectedBlock = useAppSelector((state => state.presentation.listSlides.get(selectedSlideId ?? '')?.blocks.find(block => block.id == selectedBlockIds[0])))

    const { t } = useTranslation()
    const [isTextStyleSheetOpen, setIsTextStyleSheetOpen] = useState(false)
    const [isSizePositionToolOpen, setIsSizePositionToolOpen] = useState(false)
    const [isFontFamilyPopOverOpen, setFontFamilyPopOverOpen] = useState(false)
    const [isFontWeightPopOverOpen, setFontWeightPopOverOpen] = useState(false)

    const fontListItems = useGetFontFamilyListItems()
    const fontWeightItems = useGetFontWeightList()
    const textStyleListItem = useGetTextStyleList()

    if (!selectedSlideId || selectedBlockIds.length != 1) {
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

    const toFront = () => {
        raiseOverlayPriority(slideObject)
    }

    const toBack = () => {
        lowerOverlayPriority(slideObject)
    }

    const onClickLock = () => {
        setLocking(!slideObject.isFixed)
    }

    const chevronStyle: React.CSSProperties = {
        transition: 'transform 0.5s ease',
        transform: `rotate(${isSizePositionToolOpen ? '0deg' : '-90deg'})`,
    };

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
                                className={'asd'}
                                action={() => { }}
                                inputType='number'
                                text='W'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={'asd'}
                                action={() => { }}
                                inputType='number'
                                text='H'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={'asd'}
                                action={() => { }}
                                inputType='number'
                                text='X'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={'asd'}
                                action={() => { }}
                                inputType='number'
                                text='Y'
                            />

                            <ButtonInput
                                labelId={uuid()}
                                className={'asd'}
                                action={() => { }}
                                inputType='number'
                                value={'°'}
                                icon={{
                                    path: 'src/Assets/icon_rotate.svg',
                                    className: 'sdf'

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
                        text={t('normalSize')}
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
                        {/* <ButtonInput

                        /> */}

                        <ListButton
                            className={`${styles.toolButton} ${styles.fontToolButton}`}
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
                </div>
                <div className={styles.toolUtilsArea}>
                    <span className={styles.toolSubtitle}>
                        {t('opacity')}
                    </span>
                </div>
                <div className={styles.toolUtilsArea}>
                    <span className={styles.toolSubtitle}>
                        {t('shadow')}
                    </span>
                </div>
                <div className={`${styles.toolUtilsArea} ${styles.toolFrontBack}`}>
                    <Button
                        className={`${styles.toolButton} ${styles.toolFrontBackButton}`}
                        action={toFront}
                        text={t('toFront')}
                        icon={{
                            path: 'src/Assets/icon_to_front.svg',
                            className: styles.iconToBack
                        }}
                    />
                    <Button
                        className={`${styles.toolButton} ${styles.toolFrontBackButton}`}
                        action={toBack}
                        text={t('toBack')}
                        icon={{
                            path: 'src/Assets/icon_to_back.svg',
                            className: styles.iconToBack
                        }}
                    />
                </div>

            </div>
        </>
    )
}

export default ToolTextBlock