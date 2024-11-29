import { useTranslation } from 'react-i18next'
import './App.module.css'
import TopBar from './View/TopBar/TopBar.tsx'
import Workspace from './View/Workspace/Workspace'

function App() {
	const { i18n } = useTranslation()

	return (
		<div dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}>
			<TopBar/>
			<Workspace/>
		</div>
	)
}

export default App
