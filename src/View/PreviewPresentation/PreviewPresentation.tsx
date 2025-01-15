import { useEffect, useState } from "react"
import { useAppSelector } from "../../Store/Hooks/useAppSelector"
import Slide from "../../components/Slide/Slide"
import { DefaultSlideSetting } from "../../Utils/DefaultSlideSettings"
import { useNavigate } from "react-router"
import PreviewController from "../../components/PreviewController/PreviewController"

function PreviewPresentation() {
    const [slidePos, setSlidePos] = useState(0)
    const currentSlideId = useAppSelector((state => state.presentation.orderedSlideIds[slidePos]))
    const slidesCount = useAppSelector((state => state.presentation.listSlides.size))

    const navigate = useNavigate()

    const windowWidth = window.screen.availWidth

    useEffect(() => {
        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                navigate('/')
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const isEsc = event.key == 'Escape'
            const isNext = (event.key == 'ArrowRight' || event.key == 'ArrowDown')
            const isPrev = event.key == 'ArrowLeft' || event.key == 'ArrowUp'

            if (isNext && slidePos < slidesCount - 1) {
                setSlidePos(slidePos + 1)
            }
            if (isPrev && slidePos > 0) {
                setSlidePos(slidePos - 1)
            }
            if (isEsc) {
                if (document.fullscreenElement) {
                    document.exitFullscreen()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        document.addEventListener('fullscreenchange', handleFullScreenChange)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('fullscreenchange', handleFullScreenChange)

        }
    }, [slidePos, slidesCount, navigate])

    return (
        <>
            <Slide
                slideId={currentSlideId}
                scale={windowWidth / DefaultSlideSetting.width}
            />
            <PreviewController
                escape={() => document.exitFullscreen()}
                next={() => {
                    if (slidePos < slidesCount - 1) {
                        setSlidePos(slidePos + 1)
                    }
                }}
                prev={() => {
                    if (slidePos > 0) {
                        setSlidePos(slidePos - 1)
                    }
                }}
            />
        </>
    )
}

export default PreviewPresentation