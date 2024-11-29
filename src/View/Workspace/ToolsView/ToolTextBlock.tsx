import { useTranslation } from 'react-i18next'
import styles from '../Tools/Tools.module.css'
import ListButton, { ListItem } from '../../../components/ListButton/ListButton'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import { useAppActions } from '../../../Store/Hooks/useAppActions'

function ToolTextBlock() {
    const editor = useAppSelector((state => state))
    const { raiseOverlayPriority, lowerOverlayPriority, setLocking } = useAppActions()

    const selectedSlideId = editor.selectedSlideId
    const presentation = editor.presentation
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    if (!selectedSlideId || editor.selectedBlockIds.length != 1) {
        return
    }

    const slide = presentation.listSlides.get(selectedSlideId)
    if (!slide) {
        return
    }

    const slideObject = slide.blocks.find(object => {
        return object.id == editor.selectedBlockIds[0]
    })

    if (!slideObject) {
        return
    }

    const listItems: ListItem[] = [{
        text: 'asd',
        action: () => console.log(123)
    }]

    const toFront = () => {
        raiseOverlayPriority(slideObject)
    }
    
    const toBack = () => {
        lowerOverlayPriority(slideObject)
    }

    const onClickLock = () => {
        setLocking(!slideObject.isFixed)
    }

    return (
        <>
            <div className={styles.toolTitleArea}>
                <span className={styles.toolTitle}>{t('text')}</span>
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
                            alt=""
                            className={styles.iconLock}
                            onClick={onClickLock}
                        />
                    </span>
                    <img src="src/Assets/icon_chevron_right.svg" alt="" className={styles.iconTextAreaChevron} />
                </div>

                <div className={styles.toolUtilsArea}>
                    <span className={styles.toolSubtitle}>
                        {t('textStyle')}
                    </span>
                    <ListButton
                        className={styles.toolButton}
                        action={() => setIsOpen(!isOpen)}
                        onClose={() => setIsOpen(false)}
                        text={t('normalSize')}
                        listItem={listItems}
                        isOpen={isOpen}
                        icon={{
                            path: 'src/Assets/icon_chevron_right.svg',
                            className: styles.iconChevron
                        }}

                    />
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

export default ToolTextBlock