import styles from './Tools.module.css'
import ToolSlide from '../ToolsView/ToolSlide'
import { ImageSlideObject, TextSlideObject } from '../../../Types/SlideObjectTypes'
import ToolTextBlock from '../ToolsView/ToolTextBlock'
import ToolImageBlock from '../ToolsView/ToolImageBlock'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'

type ToolsProps = {
    selectedSlideId?: string
}

function Tools({ selectedSlideId }: ToolsProps) {
    const editor = useAppSelector((state => state))
    
    if (selectedSlideId == undefined) {
        return (
            <div className={styles.toolBar}></div>
        )
    }

    const presentation = editor.presentation
    const selectedSlide = presentation.listSlides.get(selectedSlideId)

    if (selectedSlide == undefined) {
        return (<div className={styles.toolBar}></div>)
    }

    let currentBlock: TextSlideObject | ImageSlideObject | undefined
    if (editor.selectedBlockIds.length == 1) {
        
        currentBlock = selectedSlide.blocks.find(block => {
            return block.id == editor.selectedBlockIds[0]
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
                    <ToolImageBlock/>
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