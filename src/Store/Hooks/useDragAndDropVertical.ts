import React, { RefObject } from 'react'
import { changeSlidePosition } from '../Functions/modificationFunctions'
import { dispatch } from '../Editor'

type ElementProperties = {
    value: HTMLElement,
    index: number
}

function useDraggableVertical(orderedSlideIds: string[], listSlides: RefObject<HTMLDivElement>) {
    let element: ElementProperties | undefined
    let delta = 0

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (listSlides.current && e.button == 0) {
            element = findElementInListByPos(listSlides, e.clientY)
            if (element) {
                const rect = element.value.getBoundingClientRect()

                delta = e.clientY - rect.top
                element.value.style.zIndex = '1000'

                window.addEventListener('mousemove', handleMouseMove)
                window.addEventListener('mouseup', handleMouseUp)
            }
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (element) {
            element.value.style.position = 'absolute'
            const newTop = e.clientY - delta
            element.value.style.top = `${newTop}px`
        }
    }

    const handleMouseUp = () => {
        if (element) {
            const newIndex = getIndexWhereToSet(listSlides, element.value.getBoundingClientRect().y)
            dispatch(changeSlidePosition, { id: orderedSlideIds[element.index], newPosition: newIndex })

            element.value.style.position = ''
            element.value.style.zIndex = ''
            element.value.style.top = ''

        }

        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }


    return handleMouseDown
}

function findElementInListByPos(element: RefObject<HTMLElement>, mouseY: number): ElementProperties | undefined {
    if (element.current) {
        const children = element.current.children

        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect()
            if (rect.y < mouseY && rect.y + rect.height > mouseY) {
                return {
                    value: children[i] as HTMLElement,
                    index: i
                }
            }
        }
    }
}

function getIndexWhereToSet(element: RefObject<HTMLElement>, childPosY: number): number {
    if (element.current) {
        const children = Array.from(element.current.children)

        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect()
            if (childPosY < rect.top) {
                return i
            }
        }

        return children.length
    }

    return 0
}

export default useDraggableVertical