import { useTranslation } from 'react-i18next'
import { TextSlideObject } from '../../Types/SlideObjectTypes'
import { dispatch } from '../../Store/Editor'
import styles from './TextBlock.module.css'
import { changeTextBlockContent } from '../../Functions/modificationFunctions'
import { useState } from 'react'

type TextBlockProps = {
    textSlideObject: TextSlideObject
    scale?: number
}

function TextBlock({ textSlideObject, scale }: TextBlockProps) {
    const { t } = useTranslation()

    const [isContentEditable, setIsContentEditable] = useState(false)
    const [textContent, setTextContent] = useState('')

    const styleTextBlock: React.CSSProperties = {
        width: textSlideObject.size.width * (scale ?? 1),
        height: textSlideObject.size.height * (scale ?? 1),
        opacity: textSlideObject.opacity,
        zIndex: textSlideObject.overlayPriority,
        fontFamily: textSlideObject.font.family,
        fontSize: textSlideObject.font.size * (scale ?? 1),
        color: textSlideObject.font.hexColor,
        backgroundColor: textSlideObject.backgroundColor,
        borderWidth: textSlideObject.border?.width || 0,
        borderStyle: 'solid',
        borderColor: textSlideObject.border?.hexColor || 'transparent',
    }

    const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
        setTextContent(event.currentTarget.innerText)
    }

    const handleBlur = () => {
        dispatch(changeTextBlockContent, {id: textSlideObject.id, newContent: textContent})
    }

    return (
        <div
            className={styles.textBlock}
            style={styleTextBlock}
            contentEditable={isContentEditable}
            onDoubleClick={() => setIsContentEditable(true)}
            onInput={handleInputChange}
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
            draggable={false}
        >
            {textSlideObject.content || t('textBlockPlaceholder')}
        </div>
    )
}

export default TextBlock