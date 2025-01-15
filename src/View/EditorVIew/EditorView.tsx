import { useTranslation } from "react-i18next"
import TopBar from '../TopBar/TopBar'
import Workspace from '../Workspace/Workspace'
import styles from './EditorView.module.css'

function EditorView() {
    const { i18n } = useTranslation()

    return (
        <div dir={i18n.language == 'ar' ? 'rtl' : 'ltr'} className={styles.main}>
            <TopBar />
            <Workspace />
        </div>
    )
}

export default EditorView