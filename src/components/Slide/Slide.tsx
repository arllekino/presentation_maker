import styles from './Slide.module.css'
import Placeholder from '../Placeholder/Placeholder'
import { DefaultSlideSetting } from '../../Utils/DefaultSlideSettings'
import { useTranslation } from 'react-i18next'
import ObjectWrapper from '../ObjectWrapper/ObjectWrapper'
import { useAppSelector } from '../../Store/Hooks/useAppSelector'
import { useAppActions } from '../../Store/Hooks/useAppActions'
import { useRef } from 'react'

function Slide({ slideId, scale }: { slideId: string | null, scale?: number }) {
    const { t } = useTranslation()

    const editor = useAppSelector((state => state))
    const slide = useAppSelector((state => state.presentation.listSlides.get(slideId ?? '')))
    const currentSlideId = useAppSelector((state => state.selectedSlideId))

    const { createSlide } = useAppActions()

    const slideBlock = useRef<HTMLDivElement>(null)

    const slideStyle: React.CSSProperties = {
        width: `${DefaultSlideSetting.width * (scale ?? 1)}px`,
        height: `${DefaultSlideSetting.height * (scale ?? 1)}px`,
        borderRadius: scale ? '5px' : '0px',
        borderWidth: scale ? (currentSlideId == slideId ? '1px' : '0') : '1px',
        backgroundColor: slide?.background.type == 'color' ? slide.background.hexColor : undefined,
        backgroundImage: slide?.background.type == 'image' ? `url(${slide.background.path})` : undefined,
    }

    if (!slide) {
        return (
            <div className={`${styles.slide} ${styles.placeholder}`} style={slideStyle}>
                <Placeholder
                    text={t('createSlide')}
                    scale={scale}
                    action={createSlide}
                />
            </div>
        )
    }

    return (
        <div className={styles.slide} style={slideStyle} dir='ltr' draggable={false} ref={slideBlock}>
            {slide.blocks.map((slideObject) => {
                return (
                    <ObjectWrapper
                        key={slideObject.id}
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
