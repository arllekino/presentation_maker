import { getDocument, saveDocument } from './Functions/modificationFunctions'
import { EditorType } from '../Types/EditorType'

let _editor: EditorType = getDocument()
console.log(_editor);

let _handler: (() => void) | null = null

function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    _editor = newEditor
}

function dispatch(modifyFunc: Function, payload?: any): void {
    const newEditor = modifyFunc(_editor, payload)
    
    setEditor(newEditor)
    saveDocument(newEditor)

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: () => void): void {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler
}