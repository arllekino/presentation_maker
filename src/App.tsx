import './App.module.css'
import EditorView from './View/EditorVIew/EditorView.tsx'
import PreviewPresentation from './View/PreviewPresentation/PreviewPresentation.tsx'
import { HistoryContext } from './Store/History/HistoryContext.ts'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HistoryType } from './Store/History/History.ts'

type AppProps = {
	history: HistoryType
}

function App({ history }: AppProps) {

	return (
		<HistoryContext.Provider value={history}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<EditorView />} />
					<Route path='/previewPresentation' element={<PreviewPresentation />} />
				</Routes>
			</BrowserRouter>
		</HistoryContext.Provider>
	)
}

export default App
