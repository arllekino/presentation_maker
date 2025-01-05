import { useAppSelector } from '../../Store/Hooks/useAppSelector'
import Slide from '../../components/Slide/Slide'

function useCreateSlidesAsJSX(): JSX.Element[] {
    const slideIds = useAppSelector((state => state.presentation.orderedSlideIds))

    const slidesAsJSX: JSX.Element[] = []
    
    slideIds.forEach(slideId => {
        slidesAsJSX.push(
            <Slide
                slideId={slideId}
            />
        )
    })

    return slidesAsJSX
}

export {
    useCreateSlidesAsJSX
}