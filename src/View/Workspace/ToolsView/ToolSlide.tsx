import styles from './../Tools/Tools.module.css'
import buttonStyles from '../../../components/Button/Button.module.css'
import ButtonInput from '../../../components/Button/ButtonInput'
import { useTranslation } from 'react-i18next'
import useGetImageBackgroundSetter from '../../../Utils/InputSet/useGetImageBackgroundSetter'
import useGetColorBackgroundSetter from '../../../Utils/InputSet/useGetColorBackgroundSetter'
import { v4 as uuid } from 'uuid'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import { useAppActions } from '../../../Store/Hooks/useAppActions'
import PopOverSlideGradient from '../../../components/PopOverSlideGradient/PopOverSlideGradient'
import { useState } from 'react'

function ToolSlide({ slideId }: { slideId: string | null }) {
    const presentation = useAppSelector((state => state.presentation))
    const imageBlockAsBackgroundId = useAppSelector((state => state.presentation.listSlides.get(slideId || '')?.backgroundAsImageBlockId)) || ''
    const imageBlockAsBackground = useAppSelector((state => state.presentation.listSlides.get(slideId || '')?.blocks.find(block => block.id == imageBlockAsBackgroundId)))
    const { t } = useTranslation()

    const {selectBlock} = useAppActions()

    const setImageBackground = useGetImageBackgroundSetter(slideId)
    const setColorBackground = useGetColorBackgroundSetter(slideId)

    const [isGradientPopOverOpened, setIsGradientPopOverOpened] = useState(false)

    let color = '#FFFFFF'

    if (slideId != null) {
        const slide = presentation.listSlides.get(slideId)
        if (slide?.background.type == 'color') {
            color = slide.background.hexColor
        }
    }

    const onClickImagePreview = () => {
        selectBlock(imageBlockAsBackgroundId)
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

                <div className={styles.toolUtilsArea}>
                    <PopOverSlideGradient
                        buttonClassName={styles.popOverText}
                        isOpen={isGradientPopOverOpened}
                        action={() => setIsGradientPopOverOpened(!isGradientPopOverOpened)}
                        onClose={() => setIsGradientPopOverOpened(false)}
                        text={t('setBackgrondGradient')}
                    />
                </div>

                {imageBlockAsBackground && imageBlockAsBackground.type == 'image_block' && (
                    <div className={styles.toolUtilsArea}>
                        <div className={styles.imageBackgroundPreview}>
                            <span className={styles.text}>text</span>
                            <img src={imageBlockAsBackground.imagePath} className={styles.imageBlockPreview} onClick={onClickImagePreview} />

                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default ToolSlide