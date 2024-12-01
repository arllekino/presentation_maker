import { legacy_createStore as createStore } from 'redux'
import { editorReducer } from './EditorReducer'
import { saveDocument } from '../Functions/DocumentFunctions'

const store = createStore(editorReducer)

store.subscribe(() => {
    saveDocument(store.getState())
})

export {
    store
}