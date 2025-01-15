import styles from './Slide.module.css'
import Placeholder from '../Placeholder/Placeholder'
import { DefaultSlideSetting } from '../../Utils/DefaultSlideSettings'
import { useTranslation } from 'react-i18next'
import ObjectWrapper from '../ObjectWrapper/ObjectWrapper'
import { useAppSelector } from '../../Store/Hooks/useAppSelector'
import { useAppActions } from '../../Store/Hooks/useAppActions'
import React, { useRef } from 'react'

function Slide({ slideId, scale, isPdf }: { slideId: string, scale?: number, isPdf?: boolean }) {
    const { t } = useTranslation()

    const editor = useAppSelector((state => state))
    const currentSlideId = useAppSelector((state => state.selectedSlideIds[0]))
    const slide = useAppSelector((state => state.presentation.listSlides.get(slideId ?? currentSlideId)))
    const imageBlockAsBackground = slide?.blocks.find(block => block.id == slide.backgroundAsImageBlockId)

    const { createSlide } = useAppActions()

    const slideBlock = useRef<HTMLDivElement>(null)

    let imageUrl: string | undefined = undefined
    if (slide?.background.type == 'image') {
        imageUrl = slide.background.path
    }

    if (slide?.backgroundAsImageBlockId && imageBlockAsBackground?.type == 'image_block') {
        imageUrl = imageBlockAsBackground.imagePath
    }

    const slideStyle: React.CSSProperties = {
        width: `${DefaultSlideSetting.width * (scale ?? 1)}px`,
        height: `${DefaultSlideSetting.height * (scale ?? 1)}px`,
        borderRadius: scale ? '5px' : '0px',
        borderWidth: scale ? (editor.selectedSlideIds.includes(slideId) ? '1px' : '0') : '1px',
        backgroundColor: slide?.background.type == 'color' ? slide.background.hexColor : undefined,
        backgroundImage: `url(${imageUrl})`,
    }

    if (slide?.background.type == 'gradient' && !slide.backgroundAsImageBlockId) {
        slideStyle.background = `linear-gradient(
            ${slide.background.angle}deg,
            ${slide.background.points.map(point => `${point.color} ${point.range * 100}%`).join(', ')}
        )`
    }

    if (editor.presentation.listSlides.size == 0 || !slide) {
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
                        slideId={slide.id}
                        slideObject={slideObject}
                        isSelected={editor.selectedBlockIds.includes(slideObject.id)}
                        scale={scale}
                        isPdf={isPdf}
                    />
                )
            })}
        </div>
    )
}

export default Slide
