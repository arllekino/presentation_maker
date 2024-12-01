import { useRef } from 'react'

type EventHandlers = {
    onMouseDown: (event: MouseEvent) => void
    onMouseMove: (event: MouseEvent) => void
    onMouseUp: (event: MouseEvent) => void
    isFixed: boolean
}

function useMouseEvents({ onMouseDown, onMouseMove, onMouseUp, }: EventHandlers) {
    const isDragging = useRef(false)

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        onMouseDown?.(e.nativeEvent)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            onMouseMove?.(e)
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        if (isDragging.current) {
            isDragging.current = false
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            onMouseUp?.(e)
        }
    }

    return handleMouseDown
}

export default useMouseEvents