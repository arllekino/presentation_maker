import styles from '../Tools/Tools.module.css'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button/Button'
import ButtonInput from '../../../components/Button/ButtonInput'
import { v4 as uuid } from 'uuid'
import useGetImageReplacer from '../../../Utils/InputSet/useGetImageReplacer'
import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'


function ToolImageBlock() {
    const { t } = useTranslation()
    const { raiseOverlayPriority, lowerOverlayPriority, setLocking } = useAppActions()
    const selectedSlideId = useAppSelector((state => state.selectedSlideId))
    const selectedBlockIds = useAppSelector((state => state.selectedBlockIds))
    const presentation = useAppSelector((state => state.presentation))
    
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

    return (
        <>
            <div className={styles.toolTitleArea}>
                <span className={styles.toolTitle}>{t('image')}</span>
            </div>

            <div className={styles.toolMain}>

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
                    <img src='src/Assets/icon_chevron_right.svg' alt='' className={styles.iconTextAreaChevron} />
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
                        {t('font')}
                    </span>
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

export default ToolImageBlock