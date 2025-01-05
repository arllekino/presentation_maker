import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { ListItem } from '../ListButton'
import styles from '../ListButton.module.css'

enum TextStyles {
    'Title',
    'Headline',
    'Subheadline',
    'Normal text',
    'Small text'
}

type TextStylesProps = {
    className: string,
    fontSize: number,
    fontWeight: number
}

const textStyleMap = new Map<string, TextStylesProps>([
    ['Title', {
        className: styles.textStyleTitle,
        fontSize: 96,
        fontWeight: 700
    }],
    ['Headline', {
        className: styles.textStyleHeadline,
        fontSize: 48,
        fontWeight: 700
    }],
    ['Subheadline', {
        className: styles.textStyleSubheadline,
        fontSize: 32,
        fontWeight: 700
    }],
    ['Normal text', {
        className: styles.textStyleNormalText,
        fontSize: 32,
        fontWeight: 400
    }],
    ['Small text', {
        className: styles.textStyleSmallText,
        fontSize: 26,
        fontWeight: 400
    }],
])

function useGetTextStyleList(): ListItem[] {
    const { changeTextBlockFontSize, changeTextBlockFontWeight } = useAppActions()

    const listItems: ListItem[] = []

    for (const textStyle of Object.values(TextStyles)) {
        if (typeof textStyle == 'string') {
            const textStyleProps = textStyleMap.get(textStyle)
            const listItem: ListItem = {
                text: textStyle,
                className: textStyleProps?.className || '',
                action: () => {
                    changeTextBlockFontSize(textStyleProps?.fontSize || 20)
                    changeTextBlockFontWeight(textStyleProps?.fontWeight || 400)
                }
            }

            listItems.push(listItem)
        }
    }

    return listItems
}

export {
    useGetTextStyleList
}