import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './Utils/Localization/18n.ts'
import { Provider } from 'react-redux'
import { store } from './Store/Redux/Store.ts'
import { StrictMode } from 'react'
import { initHistory } from './Store/History/History.ts'

const root = createRoot(document.querySelector('#root')!)

function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App history={initHistory(store)}/>
            </Provider>
        </StrictMode>
    )
}

render()
