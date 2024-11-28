import styles from './../Tools/Tools.module.css'
import buttonStyles from '../../../components/Button/Button.module.css'
import ButtonInput from '../../../components/Button/ButtonInput'
import { useTranslation } from 'react-i18next'
import getImageBackgroundSetter from '../../../Utils/InputSet/SetImageBackground'
import getColorBackgroundSetter from '../../../Utils/InputSet/SetColorBackground'
import { getEditor } from '../../../Store/Editor'
import { v4 as uuid } from 'uuid'

function ToolSlide({ slideId }: { slideId: string | null }) {
    const presentation = getEditor().presentation

    const { t } = useTranslation()

    const setImageBackground = getImageBackgroundSetter(slideId)
    const setColorBackground = getColorBackgroundSetter(slideId)

    let color = '#FFFFFF'

    if (slideId != null) {
        const slide = presentation.listSlides.get(slideId)
        if (slide?.background.type == 'color') {
            color = slide.background.hexColor
        }
    }

    return (
        <>
            <div className={styles.toolTitleArea}>
                <span className={styles.toolTitle}>{t('slide')}</span>
            </div>

            <div className={styles.toolMain}>
                <div className={styles.toolUtilsArea}>

                    <ButtonInput
                        labelId={uuid()}
                        className={buttonStyles.setColorSlide}
                        action={setColorBackground}
                        text={t('setColorSlide')}
                        inputType='color'
                        icon={{
                            path: 'src/Assets/icon_color_slide.svg',
                            className: buttonStyles.iconSetColorSlide,
                            color: color
                        }}
                    />
                </div>

                <div className={styles.toolUtilsArea}>

                    <ButtonInput
                        labelId={uuid()}
                        className={buttonStyles.setBackgroundImage}
                        action={setImageBackground}
                        text={t('setBackgroundImage')}
                        inputType='file'
                        icon={{
                            path: 'src/Assets/icon_add_image_block.svg',
                            className: buttonStyles.iconSetBackgroundImage
                        }}
                    />
                </div>

            </div>
        </>
    )
}

export default ToolSlide