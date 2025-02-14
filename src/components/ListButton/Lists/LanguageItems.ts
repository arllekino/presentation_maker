import { useTranslation } from "react-i18next"
import { ListItem } from "../ListButton"

function useLanguageItems(iconClassName: string): ListItem[] {
    const { t, i18n } = useTranslation()

    const items: ListItem[] = []
    
    const listItemRu: ListItem = {
        text: t('russianLng'),
        action: () => i18n.changeLanguage('ru'),
        className: '',
        icon: {
            path: '/src/Assets/icon_russia.svg',
            className: iconClassName
        }
    }

    const listItemEn: ListItem = {
        text: t('englishLng'),
        action: () => i18n.changeLanguage('en'),
        className: '',
        icon: {
            path: '/src/Assets/icon_uk.svg',
            className: iconClassName
        }
    }

    const listItemAr: ListItem = {
        text: t('arabianLng'),
        action: () => i18n.changeLanguage('ar'),
        className: '',
        icon: {
            path: '/src/Assets/icon_uae.svg',
            className: iconClassName
        }
    }

    items.push(listItemRu)
    items.push(listItemEn)
    items.push(listItemAr)

    return items
}

export default useLanguageItems