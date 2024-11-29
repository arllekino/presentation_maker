import { RefObject } from 'react'
import { useAppActions } from './useAppActions'

enum PointType {
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left
}

type Position = {
    x: number
    y: number
}

type Size = {
    width: number,
    height: number
}

type PointProps = {
    block: RefObject<HTMLDivElement>
    type: PointType
}

function useResize(block: RefObject<HTMLDivElement>, isFixed: boolean, point: PointProps) {
    const {changeBlockPosition, resizeBlock} = useAppActions()
   
    let size: Size = { width: 0, height: 0 }
    let position: Position = { x: 0, y: 0 }
    const startPos: Position = { x: 0, y: 0 }
    const startSize: Size = {width: 0, height: 0}

    const handleMouseDown = () => {
        if (block.current && block.current.parentElement) {
            const blockProps = block.current.getBoundingClientRect()
            const parentBlockProps = block.current.parentElement.getBoundingClientRect()

            startPos.x = blockProps.x - parentBlockProps.x
            startPos.y = blockProps.y - parentBlockProps.y
            startSize.width = blockProps.width
            startSize.height = blockProps.height

            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (block.current) {
            const newProps = onResize(block, point, { x: event.clientX, y: event.clientY }, startPos, startSize)

            if (newProps) {
                if (newProps.position.x < newProps.position.x + newProps.size.width
                    && newProps.position.y < newProps.position.y + newProps.size.height
                ) {
                    block.current.style.marginLeft = `${newProps.position.x}px`
                    block.current.style.marginTop = `${newProps.position.y}px`
                    block.current.style.width = `${newProps.size.width}px`
                    block.current.style.height = `${newProps.size.height}px`
                }

                size = newProps.size
                position = newProps.position
            }
        }
    }

    const handleMouseUp = () => {
        changeBlockPosition(position.x, position.y)
        resizeBlock(size.width, size.height)

        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }

    if (isFixed) {
        return () => { }
    }

    return handleMouseDown
}

function onResize(block: RefObject<HTMLDivElement>, point: PointProps, mousePos: Position, startPos: Position, startSize: Size): { position: Position, size: Size } | undefined {
    if (!block.current || !block.current.parentElement) {
        return undefined
    }

    const blockProps = block.current.getBoundingClientRect()
    const parentProps = block.current.parentElement?.getBoundingClientRect()

    const position: Position = {
        x: startPos.x,
        y: startPos.y
    }
    const size: Size = {
        width: blockProps.width,
        height: blockProps.height
    }

    switch (point.type) {
        case PointType.topLeft:
            position.x = (mousePos.x - parentProps.x)
            position.y = (mousePos.y - parentProps.y)
            size.height = startSize.height + startPos.y - (mousePos.y - parentProps.y)
            size.width = startSize.width + startPos.x - (mousePos.x - parentProps.x)
            
            break

        case PointType.top:
            position.y = (mousePos.y - parentProps.y)
            size.height = startSize.height + startPos.y - (mousePos.y - parentProps.y)

            break

        case PointType.topRight:
            position.y = (mousePos.y - parentProps.y)
            size.height = startSize.height + startPos.y - (mousePos.y - parentProps.y)
            size.width = mousePos.x - blockProps.x

            break

        case PointType.right:
            size.width = mousePos.x - blockProps.x

            break

        case PointType.bottomRight:
            size.width = mousePos.x - blockProps.x
            size.height = mousePos.y - blockProps.y

            break

        case PointType.bottom:
            size.height = mousePos.y - blockProps.y

            break

        case PointType.bottomLeft:
            position.x = (mousePos.x - parentProps.x)
            size.width = startSize.width + startPos.x - (mousePos.x - parentProps.x)
            size.height = mousePos.y - blockProps.y

            break

        case PointType.left:
            position.x = (mousePos.x - parentProps.x)
            size.width = startSize.width + startPos.x - (mousePos.x - parentProps.x)

            break

        default:
            break
    }

    return {
        size: size,
        position: position
    }
}

export default useResize
export {
    PointType
}