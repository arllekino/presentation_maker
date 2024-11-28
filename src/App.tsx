import { useTranslation } from 'react-i18next'
import './App.module.css'
import { getEditor } from './Store/Editor.ts'
import TopBar from './View/TopBar/TopBar.tsx'
import Workspace from './View/Workspace/Workspace'

function App() {
	const { i18n } = useTranslation()

	const editor = getEditor()

	return (
		<div dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}>
			<TopBar/>
			<Workspace
				editor={editor}
			/>
		</div>
	)
}

export default App
