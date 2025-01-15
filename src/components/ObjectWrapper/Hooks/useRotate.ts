import { RefObject } from "react"
import { useAppActions } from "../../../Store/Hooks/useAppActions"

function useRotate(block: RefObject<HTMLDivElement>, startRotation: number, isFixed: boolean, point: RefObject<HTMLDivElement>) {
    const { setRotationToBlock } = useAppActions()
    let rotation = startRotation

    const calculateRotation = (x: number, y: number) => {
        if (block.current && point.current) {
            const rect = block.current.getBoundingClientRect()

            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const deltaX = x - centerX
            const deltaY = y - centerY

            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
            return angle + 90
        }
        return 0
    }

    const handleMouseDown = () => {
        if (block.current && point.current && !isFixed) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        rotation = calculateRotation(event.clientX, event.clientY);

        if (block.current) {
            block.current.style.transform = `rotate(${rotation}deg)`
        }
    }

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        if (block.current) {
            setRotationToBlock(rotation)
        }
    }

    if (isFixed) {
        return () => { }
    }

    return handleMouseDown
}

export {
    useRotate
}