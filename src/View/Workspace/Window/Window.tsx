import Slide from '../../../components/Slide/Slide'
import { SlideType } from '../../../Types/SlideType'
import styles from './Window.module.css'

type WindowProps = {
    slide: SlideType | undefined
}

function Window({ slide }: WindowProps) {
    return (
        <div className={styles.slideArea}>
            <Slide
                slide={slide}
            />
        </div>
    )
}

export default Window