import Slide from '../../../components/Slide/Slide'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import styles from './Window.module.css'

function Window() {
    const currentSlideId = useAppSelector((state => state.selectedSlideIds[0]))

    return (
        <div className={styles.slideArea}>
            <Slide
                slideId={currentSlideId}
            />
        </div>
    )
}

export default Window