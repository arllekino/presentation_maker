import { ImageSlideObject } from '../../Types/SlideObjectTypes'
import styles from './ImageBlock.module.css'

type ImageBlockProps = {
    imageSlideObject: ImageSlideObject,
    scale?: number
}

function ImageBlock({ imageSlideObject, scale }: ImageBlockProps) {
    const styleImageBlock: React.CSSProperties = {
        opacity: imageSlideObject.opacity,
        backgroundImage: `url(${imageSlideObject.imagePath})`
    }

    if (imageSlideObject.border != null) {
        styleImageBlock.borderWidth = `${imageSlideObject.border.width * (scale ?? 1)}px`
        styleImageBlock.borderStyle = 'solid'
        styleImageBlock.borderColor = imageSlideObject.border.hexColor
    }

    return (
        <div
            className={styles.imageBlock}
            style={styleImageBlock}
            draggable={false}
        >
        </div>
    )
}

export default ImageBlock