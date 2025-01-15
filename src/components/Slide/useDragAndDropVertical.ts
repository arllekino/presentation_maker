import React, { RefObject } from 'react'
import { useAppActions } from '../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../Store/Hooks/useAppSelector'

type ElementProperties = {
    value: HTMLElement,
    index: number
}

function useDraggableVertical(
    listSlides: RefObject<HTMLDivElement>
) {
    const { changeSlidePosition } = useAppActions()
    const orderedSlideIds = useAppSelector((state => state.presentation.orderedSlideIds))
    const selectedSlideIds = useAppSelector((state => state.selectedSlideIds))

    let elements: ElementProperties[]
    let delta = 0

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (listSlides.current && e.button == 0) {
            elements = findElementInListByPos(listSlides, orderedSlideIds, selectedSlideIds)
            if (elements.length) {
                const rect = elements[0].value.getBoundingClientRect()

                delta = e.clientY - rect.top
                elements.forEach(element => {
                    element.value.style.zIndex = '1000'
                })

                window.addEventListener('mousemove', handleMouseMove)
                window.addEventListener('mouseup', handleMouseUp)
            }
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (elements.length) {
            elements.map((element, i)  => {
                element.value.style.position = 'absolute'
                const newTop = e.clientY - delta + i * 2
                element.value.style.top = `${newTop}px`
                element.value.style.left = `${i * 2}px`
            })
        }
    }

    const handleMouseUp = () => {
        if (elements.length) {
            elements.map((element, i)  => {
                const newIndex = getIndexWhereToSet(listSlides, element.value.getBoundingClientRect().y, selectedSlideIds, orderedSlideIds) + i
                changeSlidePosition(orderedSlideIds[element.index], newIndex)
    
                element.value.style.position = ''
                element.value.style.zIndex = ''
                element.value.style.top = ''
                element.value.style.left = ''
            })
        }

        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }

    return handleMouseDown
}

function findElementInListByPos(element: RefObject<HTMLElement>, orderedSlideIds: string[], selectedSlideIds: string[]): ElementProperties[] {
    const elements: ElementProperties[] = []

    if (element.current) {
        const children = element.current.children

        selectedSlideIds.forEach(selectedSlideId => {
            const index = orderedSlideIds.indexOf(selectedSlideId)
            elements.push({
                value: children[index] as HTMLElement,
                index: index
            })
        })
    }

    return elements
}

function getIndexWhereToSet(element: RefObject<HTMLElement>, childPosY: number, selectedBlockIds: string[], orderedSlideIds: string[]): number {
    if (element.current) {
        const children = Array.from(element.current.children)

        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect()
            if (childPosY < rect.top && !selectedBlockIds.includes(orderedSlideIds[i])) {
                return i
            }
        }

        return children.length
    }

    return 0
}

export default useDraggableVertical