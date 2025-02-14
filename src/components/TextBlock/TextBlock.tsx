import { useTranslation } from 'react-i18next'
import { TextSlideObject } from '../../Types/SlideObjectTypes'
import styles from './TextBlock.module.css'
import { useState } from 'react'
import { useAppActions } from '../../Store/Hooks/useAppActions'

type TextBlockProps = {
    textSlideObject: TextSlideObject
    scale?: number
    isPdf?: boolean 
}

function TextBlock({ textSlideObject, scale, isPdf }: TextBlockProps) {
    const { t } = useTranslation()
    const { changeTextBlockContent } = useAppActions()
    const [textContent, setTextContent] = useState('')

    const styleTextBlock: React.CSSProperties = {
        opacity: textSlideObject.opacity,
        fontFamily: textSlideObject.font.family,
        fontSize: textSlideObject.font.size * (scale ?? 1),
        color: textSlideObject.font.hexColor,
        fontWeight: textSlideObject.font.weight,
        backgroundColor: textSlideObject.backgroundColor,
        borderWidth: textSlideObject.border?.width || 0,
        borderStyle: 'solid',
        borderColor: textSlideObject.border?.hexColor || 'transparent',
        textAlign: textSlideObject.textAlignment
    }

    const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
        setTextContent(event.currentTarget.innerText)
    }

    const handleBlur = () => {
        changeTextBlockContent(textSlideObject.id, textContent)
    }

    return (
        <div
            className={styles.textBlock}
            style={styleTextBlock}
            contentEditable={isPdf ? false : true}
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