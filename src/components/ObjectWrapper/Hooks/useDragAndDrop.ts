import { RefObject } from 'react'
import { useAppActions } from '../../../Store/Hooks/useAppActions'

function useDragAndDrop(
    block: RefObject<HTMLParagraphElement | HTMLDivElement>,
    blockId: string,
    isFixed: boolean,
) {
    const { unsetSelectionSlideObjects, changeBlockPosition } = useAppActions()

    let delta = { x: 0, y: 0 }

    const handleMouseDown = ((e: React.MouseEvent<HTMLParagraphElement | HTMLDivElement>) => {
        const currentPath = window.location.pathname
        if (currentPath == '/previewPresentation') {
            return
        }

        if (block.current) {
            const currentBlock = block.current
            const parentElement = currentBlock.parentElement!

            const handleClickOutside = (e: MouseEvent) => {
                if (!currentBlock.contains(e.target as Node) &&
                    parentElement.contains(e.target as Node)
                ) {
                    let isNoNeedToUnselect = false
                    currentBlock.childNodes.forEach(element => {
                        isNoNeedToUnselect = element.contains(e.target as Node)
                        if (isNoNeedToUnselect) return
                    })

                    if (!isNoNeedToUnselect) {
                        unsetSelectionSlideObjects(blockId)
                    }
                }
            }

            const blockProperties = currentBlock.getBoundingClientRect()

            delta = {
                x: e.clientX - blockProperties.x,
                y: e.clientY - blockProperties.y,
            }

            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            window.addEventListener('mousedown', handleClickOutside)

            return () => {
                window.removeEventListener('mousedown', handleClickOutside)
            }
        }
    })

    const handleMouseMove = ((e: MouseEvent) => {
        if (block.current && block.current.parentElement) {
            const x = e.clientX - delta.x - block.current.parentElement.getBoundingClientRect().x
            const y = e.clientY - delta.y - block.current.parentElement.getBoundingClientRect().y

            block.current.style.marginLeft = `${x}px`
            block.current.style.marginTop = `${y}px`
        }
    })

    const handleMouseUp = ((e: MouseEvent) => {
        if (block.current && block.current.parentElement) {
            const newX = e.clientX - block.current.parentElement.getBoundingClientRect().x - delta.x
            const newY = e.clientY - block.current.parentElement.getBoundingClientRect().y - delta.y

            changeBlockPosition(newX, newY)
        }

        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    })

    if (isFixed) {
        return () => { }
    }

    return handleMouseDown
}

export default useDragAndDrop
