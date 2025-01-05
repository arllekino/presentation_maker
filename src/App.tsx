import { useTranslation } from 'react-i18next'
import './App.module.css'
import TopBar from './View/TopBar/TopBar.tsx'
import Workspace from './View/Workspace/Workspace'
import { HistoryType } from './Utils/History.ts'
import { HistoryContext } from './components/ObjectWrapper/Hooks/HistoryContext.ts'

type AppProps = {
	history: HistoryType
}

function App({ history }: AppProps) {
	const { i18n } = useTranslation()

	return (
		<HistoryContext.Provider value={history}>
			<div dir={i18n.language == 'ar' ? 'rtl' : 'ltr'}>
				<TopBar />
				<Workspace />
			</div>
		</HistoryContext.Provider>
	)
}

export default App
