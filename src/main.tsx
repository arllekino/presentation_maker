import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './Utils/Localization/18n.ts'
import { addEditorChangeHandler } from './Store/Editor.ts'
import { Provider } from 'react-redux'
import {store} from './Store/Redux/Store.ts'

const root = createRoot(document.querySelector('#root')!)

function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </Provider>
        </StrictMode>
    )
}

addEditorChangeHandler(render)
render()
