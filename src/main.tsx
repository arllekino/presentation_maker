import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './Utils/Localization/18n.ts'
import { addEditorChangeHandler } from './Store/Editor.ts'

const root = createRoot(document.querySelector('#root')!)

function render() {

	root.render(
		<StrictMode>
			<Suspense fallback={<div>Loading...</div>}>
				<App />
			</Suspense>
		</StrictMode>,
	)
}

addEditorChangeHandler(render)
render()