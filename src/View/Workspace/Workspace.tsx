import styles from './Workspace.module.css'
import buttonStyles from '../../components/Button/Button.module.css'
import Window from './Window/Window'
import SlideList from './SlideList/SlideList'
import Tools from './Tools/Tools'
import Button from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import { useAppActions } from '../../Store/Hooks/useAppActions'

function Workspace() {
    const { createSlide, deleteSlide } = useAppActions()
    
    const { t } = useTranslation()

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

                    <Button
                        className={styles.deleteSlide}
                        action={() => deleteSlide()}
                        icon={{
                            path: 'src/Assets/icon_trash.svg',
                            className: ''
                        }}
                    />
                </div>
                <SlideList/>
            </div>
            <Window/>
            <Tools/>
            
        </div>
    )
}

export default Workspace