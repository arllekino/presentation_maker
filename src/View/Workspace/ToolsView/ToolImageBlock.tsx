import styles from '../Tools/Tools.module.css'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button/Button'
import ButtonInput from '../../../components/Button/ButtonInput'
import { v4 as uuid } from 'uuid'
import useGetImageReplacer from '../../../Utils/InputSet/useGetImageReplacer'
import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import { useState } from 'react'


function ToolImageBlock() {
    const { t } = useTranslation()
    const { raiseOverlayPriority, lowerOverlayPriority, setLocking } = useAppActions()
    const selectedSlideId = useAppSelector((state => state.selectedSlideId))
    const selectedBlockIds = useAppSelector((state => state.selectedBlockIds))
    const presentation = useAppSelector((state => state.presentation))

    const [isSizePositionToolOpen, setIsSizePositionToolOpen] = useState(false)

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

    const toFront = () => {
        raiseOverlayPriority(slideObject)
    }

    const toBack = () => {
        lowerOverlayPriority(slideObject)
    }

    const onClickLock = () => {
        setLocking(!slideObject.isFixed)
    }

    const useHandleImageReplace = () => {
        useGetImageReplacer(slideObject.id)
    }

    const chevronStyle: React.CSSProperties = {
        transition: 'transform 0.5s ease',
        transform: `rotate(${isSizePositionToolOpen ? '0deg' : '-90deg'})`,
    };

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
                                icon={{
                                    path: 'asd',
                                    className: 'sdf'

                                }}
                            />

                        </div>
                    )}
                </div>

                <div className={styles.toolUtilsArea}>
                    <div className={styles.toolWrapper}>
                        <ButtonInput
                            labelId={uuid()}
                            className={styles.toolSubtitle}
                            action={useHandleImageReplace}
                            text={t('replaceMedia')}
                            inputType={'file'}
                        />
                    </div>
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

export default ToolImageBlock