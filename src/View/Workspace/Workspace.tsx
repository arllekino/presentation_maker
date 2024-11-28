import styles from './Workspace.module.css'
import buttonStyles from '../../components/Button/Button.module.css'
import Window from './Window/Window'
import SlideList from './SlideList/SlideList'
import Tools from './Tools/Tools'
import Button from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import { EditorType } from '../../Types/EditorType'
import { dispatch } from '../../Store/Editor'
import { createSlide } from '../../Functions/modificationFunctions'

type WorkspaceProps = {
    editor: EditorType
}

function Workspace({ editor }: WorkspaceProps) {
    const { t } = useTranslation()

    const slide = editor.selectedSlideId == null ? undefined : editor.presentation.listSlides.get(editor.selectedSlideId)

    return (
        <div className={styles.workspace}>
            <div className={styles.leftBar}>
                <div className={styles.buttons}>
                    <Button
                        className={buttonStyles.addSlideButton}
                        action={() => dispatch(createSlide)}
                        text={t('newSlide')}
                        icon={{
                            path: '/src/assets/icon_add_slide.svg',
                            className: buttonStyles.iconAddSlide,
                        }}
                    />

                </div>
                <SlideList
                    orderedSlideIds={editor.presentation.orderedSlideIds}
                    listSlides={editor.presentation.listSlides}
                    currentSlideId={editor.selectedSlideId}
                />
            </div>
            <Window
                slide={slide}
            />
            <Tools
                selectedSlideId={slide?.id}
            />
            
        </div>
    )
}

export default Workspace