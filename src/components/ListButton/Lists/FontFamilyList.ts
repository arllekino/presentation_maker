import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { ListItem } from '../ListButton'
import styles from '../ListButton.module.css'

const fontFamilyMap = new Map<string, string>([
    ['Arial', styles.fontFamilyArial],
    ['Verdana', styles.fontFamilyVerdana],
    ['Times New Roman', styles.fontFamilyTimesNewRoman],
    ['Georgia', styles.fontFamilyGeorgia],
    ['Courier New', styles.fontFamilyCourierNew],
    ['Trebuchet MS', styles.fontFamilyTrebuchetMS],
    ['Impact', styles.fontFamilyImpact],
    ['Franklin Gothic Medium', styles.fontFamilyFranklinGothicMedium],
])

function useGetFontFamilyListItems(): ListItem[] {
    enum DefaultFonts {
        arial = 'Arial',
        verdana = 'Verdana',
        timesNewRoman = 'Times New Roman',
        georgia = 'Georgia',
        courierNew = 'Courier New',
        trebuchetMS = 'Trebuchet MS',
        impact = 'Impact',
        comicSansMS = 'Franklin Gothic Medium',
    }

    const { changeTextBlockFontFamily } = useAppActions()

    const listItems: ListItem[] = []

    for (const font of Object.values(DefaultFonts)) {
        const listItem: ListItem = {
            text: font,
            className: fontFamilyMap.get(font) || '',
            action: () => {
                changeTextBlockFontFamily(font)
            }
        }
        listItems.push(listItem)
    }

    return listItems
}

export {
    useGetFontFamilyListItems
}