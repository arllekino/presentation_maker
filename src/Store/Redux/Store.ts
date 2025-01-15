import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { editorReducer, loadEditor } from './EditorReducer'
import { saveDocument } from '../Functions/DocumentFunctions'
import { thunk } from 'redux-thunk'

const store = createStore(editorReducer, applyMiddleware(thunk))

store.dispatch(loadEditor())

store.subscribe(() => {
    saveDocument(store.getState())
})

export {
    store
}