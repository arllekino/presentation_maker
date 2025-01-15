import styles from './Tools.module.css'
import ToolSlide from '../ToolsView/ToolSlide'
import { ImageSlideObject, TextSlideObject } from '../../../Types/SlideObjectTypes'
import ToolTextBlock from '../ToolsView/ToolTextBlock'
import ToolImageBlock from '../ToolsView/ToolImageBlock'
import { SlideType } from '../../../Types/SlideType'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'

function Tools() {
    const selectedBlockIds = useAppSelector((state => state.selectedBlockIds))
    const selectedSlideId = useAppSelector((state => state.selectedSlideIds[0]))
    const selectedSlide: SlideType | undefined = useAppSelector((state => state.presentation.listSlides.get(selectedSlideId ?? '')))

    if (selectedSlideId == undefined) {
        return (
            <div className={styles.toolBar}></div>
        )
    }
    if (selectedSlide == undefined) {
        return (<div className={styles.toolBar}></div>)
    }

    let currentBlock: TextSlideObject | ImageSlideObject | undefined
    if (selectedBlockIds.length == 1) {
        currentBlock = selectedSlide.blocks.find(block => {
            return block.id == selectedBlockIds[0]
        })
    }

    if (currentBlock == undefined) {
        return (
            <div className={styles.toolBar}>
                <ToolSlide
                    slideId={selectedSlideId}
                />
            </div>)
    }

    switch (currentBlock.type) {
        case 'image_block':

            return (
                <div className={styles.toolBar}>
                    <ToolImageBlock />
                </div>
            )

        case 'text_block':

            return (
                <div className={styles.toolBar}>
                    <ToolTextBlock />
                </div>
            )

        default:

            return (
                <div className={styles.toolBar}>
                    <ToolSlide
                        slideId={selectedSlideId}
                    />
                </div>
            )
    }
}

export default Tools