import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './Utils/Localization/18n.ts'
import { Provider } from 'react-redux'
import { store } from './Store/Redux/Store.ts'

const root = createRoot(document.querySelector('#root')!)

function render() {
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

render()
