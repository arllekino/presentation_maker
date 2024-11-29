import styles from './Workspace.module.css'
import buttonStyles from '../../components/Button/Button.module.css'
import Window from './Window/Window'
import SlideList from './SlideList/SlideList'
import Tools from './Tools/Tools'
import Button from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import { useAppActions } from '../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../Store/Hooks/useAppSelector'

function Workspace() {
    const { t } = useTranslation()

    const { createSlide } = useAppActions()

    const editor = useAppSelector((state => state))

    const slide = editor.selectedSlideId == null ? undefined : editor.presentation.listSlides.get(editor.selectedSlideId)

    return (
        <div className={styles.workspace}>
            <div className={styles.leftBar}>
                <div className={styles.buttons}>
                    <Button
                        className={buttonStyles.addSlideButton}
                        action={createSlide}
                        text={t('newSlide')}
                        icon={{
                            path: '/src/assets/icon_add_slide.svg',
                            className: buttonStyles.iconAddSlide,
                        }}
                    />
                </div>
                <SlideList/>
            </div>
            <Window/>
            <Tools
                selectedSlideId={slide?.id}
            />
            
        </div>
    )
}

export default Workspace