import styles from './Slide.module.css'
import Placeholder from '../Placeholder/Placeholder'
import { DefaultSlideSetting } from '../../Utils/DefaultSlideSettings'
import { SlideType } from '../../Types/SlideType'
import { useTranslation } from 'react-i18next'
import { dispatch, getEditor } from '../../Store/Editor'
import { createSlide } from '../../Functions/modificationFunctions'
import ObjectWrapper from '../ObjectWrapper/ObjectWrapper'

type SlideProps = {
    slide: SlideType | undefined
    scale?: number
}

function Slide({ slide, scale }: SlideProps) {
    const { t } = useTranslation()

    const editor = getEditor()

    const slideStyle: React.CSSProperties = {
        width: `${DefaultSlideSetting.width * (scale ?? 1)}px`,
        height: `${DefaultSlideSetting.height * (scale ?? 1)}px`,
        borderRadius: scale ? '10px' : '0px',
        borderWidth: scale ? '0' : '1px',
        backgroundColor: slide?.background.type == 'color' ? slide.background.hexColor : undefined,
        backgroundImage: slide?.background.type == 'image' ? `url(${slide.background.path})` : undefined,
    }

    if (!slide) {
        return (
            <div className={`${styles.slide} ${styles.placeholder}`} style={slideStyle}>
                <Placeholder
                    text={t('createSlide')}
                    scale={scale}
                    action={() => dispatch(createSlide)}
                />
            </div>
        )
    }

    return (
        <div className={styles.slide} style={slideStyle} dir='ltr' draggable={false}>
            {slide.blocks.map((slideObject) => {
                return (
                    <ObjectWrapper key={slideObject.id}
                        slideObject={slideObject}
                        isSelected={editor.selectedBlockIds.includes(slideObject.id)}
                        scale={scale}
                    />
                )
            })}
        </div>
    )
}

export default Slide
