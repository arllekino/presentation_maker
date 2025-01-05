import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { convertFontWeightToString } from '../../../Utils/ConvertFontWeightToString'
import { ListItem } from '../ListButton'
import styles from '../ListButton.module.css'

enum DefaultFontWeights {
    thin = 100,
    extraLight = 200,
    light = 300,
    regular = 400,
    medium = 500,
    semiBold = 600,
    bold = 700,
    extraBold = 800,
    black = 900
}

const fontWeightMap = new Map<number, string>([
    [100, styles.fontWeightThin],
    [200, styles.fontWeightExtraLight],
    [300, styles.fontWeightLight],
    [400, styles.fontWeightRegular],
    [500, styles.fontWeightMedium],
    [600, styles.fontWeightSemiBold],
    [700, styles.fontWeightBold],
    [800, styles.fontWeightExtraBold],
    [900, styles.fontWeightBlack]
])

function useGetFontWeightList(): ListItem[] {
    const { changeTextBlockFontWeight } = useAppActions()

    const listItems: ListItem[] = []

    for (const fontWeight of Object.values(DefaultFontWeights)) {
        if (typeof fontWeight === 'number') {
            const listItem: ListItem = {
                text: convertFontWeightToString(fontWeight),
                className: fontWeightMap.get(fontWeight) || '',
                action: () => {
                    changeTextBlockFontWeight(fontWeight)
                }
            }
            listItems.push(listItem)
        }
    }

    return listItems
}

export {
    useGetFontWeightList
}