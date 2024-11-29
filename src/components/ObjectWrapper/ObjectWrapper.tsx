import styles from './ObjectWrapper.module.css'
import { ImageSlideObject, TextSlideObject } from '../../Types/SlideObjectTypes'
import TextBlock from '../TextBlock/TextBlock'
import ImageBlock from '../ImageBlock/ImageBlock'
import React, { useEffect, useRef, useState } from 'react'
import { addBlockToSelected, selectBlock } from '../../Store/Functions/modificationFunctions'
import useDragAndDrop from '../../Store/Hooks/useDragAndDrop'
import { dispatch } from '../../Store/Editor'
import useResize, { PointType } from '../../Store/Hooks/useResize'

type ObjectWrapperProps = {
    slideObject: TextSlideObject | ImageSlideObject
    isSelected: boolean
    scale?: number
}

function ObjectWrapper({ slideObject, isSelected, scale }: ObjectWrapperProps) {
    const blockId = slideObject.id
    const [selectFunction, setSelectFunction] = useState(() => selectBlock)
    const block = useRef<HTMLImageElement>(null)
    const dragAndDrop = useDragAndDrop(block, slideObject.id, slideObject.isFixed)

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLElement && event.target.classList.contains(styles.handle)) {
            return
        }
        dragAndDrop(event)
    }


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey) {
                setSelectFunction(() => addBlockToSelected)
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            if (!event.ctrlKey) {
                setSelectFunction(() => selectBlock)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const pointTopLeft = useRef<HTMLDivElement>(null)
    const pointTop = useRef<HTMLDivElement>(null)
    const pointTopRight = useRef<HTMLDivElement>(null)
    const pointRight = useRef<HTMLDivElement>(null)
    const pointBottomRight = useRef<HTMLDivElement>(null)
    const pointBottom = useRef<HTMLDivElement>(null)
    const pointBottomLeft = useRef<HTMLDivElement>(null)
    const pointLeft = useRef<HTMLDivElement>(null)

    const handlePointTopLeft = useResize(block, slideObject.isFixed, {
        block: pointTopLeft,
        type: PointType.topLeft
    })
    const handlePointTop = useResize(block, slideObject.isFixed, {
        block: pointTop,
        type: PointType.top
    })
    const handlePointTopRight = useResize(block, slideObject.isFixed, {
        block: pointTopRight,
        type: PointType.topRight
    })
    const handlePointRight = useResize(block, slideObject.isFixed, {
        block: pointRight,
        type: PointType.right
    })
    const handlePointBottomRight = useResize(block, slideObject.isFixed, {
        block: pointBottomRight,
        type: PointType.bottomRight
    })
    const handlePointBottom = useResize(block, slideObject.isFixed, {
        block: pointBottom,
        type: PointType.bottom
    })
    const handlePointBottomLeft = useResize(block, slideObject.isFixed, {
        block: pointBottomLeft,
        type: PointType.bottomLeft
    })
    const handlePointLeft = useResize(block, slideObject.isFixed, {
        block: pointLeft,
        type: PointType.left
    })

    const makeFocus = () => {
        dispatch(selectFunction, { blockId })
    }

    const styleBlock: React.CSSProperties = {
        marginLeft: slideObject.coordinates.x * (scale ?? 1),
        marginTop: slideObject.coordinates.y * (scale ?? 1),
        width: slideObject.size.width * (scale ?? 1),
        height: slideObject.size.height * (scale ?? 1),
        outlineWidth: isSelected ? (scale ? '1px' : '2px') : 0,
        outlineStyle: 'solid',
    }

    const stylePont: React.CSSProperties = {
        display: (scale || slideObject.isFixed) ? 'none' : 'block',
    
    }

    return (
        <div
            key={slideObject.id}
            className={styles.wrapper}
            ref={block}
            onMouseDown={handleMouseDown}
            onClick={makeFocus}
            style={styleBlock}
            draggable={false}
        >
            {isSelected && (
                <>
                    <div
                        ref={pointTopLeft}
                        className={`${styles.handle} ${styles.topLeft}`}
                        style={stylePont}
                        onMouseDown={handlePointTopLeft}
                    ></div>

                    <div
                        ref={pointTop}
                        className={`${styles.handle} ${styles.top}`}
                        style={stylePont}
                        onMouseDown={handlePointTop}
                    ></div>

                    <div
                        ref={pointTopRight}
                        className={`${styles.handle} ${styles.topRight}`}
                        style={stylePont}
                        onMouseDown={handlePointTopRight}
                    ></div>

                    <div
                        ref={pointRight}
                        className={`${styles.handle} ${styles.right}`}
                        style={stylePont}
                        onMouseDown={handlePointRight}
                    ></div>

                    <div
                        ref={pointBottomRight}
                        className={`${styles.handle} ${styles.bottomRight}`}
                        style={stylePont}
                        onMouseDown={handlePointBottomRight}
                    ></div>

                    <div
                        ref={pointBottom}
                        className={`${styles.handle} ${styles.bottom}`}
                        style={stylePont}
                        onMouseDown={handlePointBottom}
                    ></div>

                    <div
                        ref={pointBottomLeft}
                        className={`${styles.handle} ${styles.bottomLeft}`}
                        style={stylePont}
                        onMouseDown={handlePointBottomLeft}
                    ></div>

                    <div
                        ref={pointLeft}
                        className={`${styles.handle} ${styles.left}`}
                        style={stylePont}
                        onMouseDown={handlePointLeft}
                    ></div>
                </>
            )}

            {slideObject.type === 'text_block' ? (
                <TextBlock
                    key={slideObject.id}
                    textSlideObject={slideObject}
                    scale={scale}
                />
            ) : slideObject.type === 'image_block' ? (
                <ImageBlock
                    key={slideObject.id}
                    imageSlideObject={slideObject}
                    scale={scale}
                />
            ) : (<div>
</div>)}
        </div>
    )
}

export default ObjectWrapper