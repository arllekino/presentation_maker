import { EditorType } from '../../Types/EditorType'
import { DefaultSlideSetting } from '../../Utils/DefaultSlideSettings'
import isEditorValid from '../../Utils/Validation/ValidateEditor'
import { createEditor } from './PresentationFunctions'

function saveDocument(editor: EditorType): EditorType {
    localStorage.removeItem(DefaultSlideSetting.localStorageItemName)
    
    const listSlidesObject = Object.fromEntries(editor.presentation.listSlides)

    const editorCopy = {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: listSlidesObject,
        },
    }
    
    if (isEditorValid(editor)) {
        const editorJSON = JSON.stringify(editorCopy)
        localStorage.setItem(DefaultSlideSetting.localStorageItemName, editorJSON)
    }

    return editor
}

function saveDocumentToFile(editor: EditorType): EditorType {
    const filename = DefaultSlideSetting.saveFilename
    const listSlidesObject = Object.fromEntries(editor.presentation.listSlides)

    const editorCopy = {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: listSlidesObject,
        },
    }
    
    if (isEditorValid(editor)) {
        const editorJSON = JSON.stringify(editorCopy)
        const file = new Blob([editorJSON], {type: 'application/json'})
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.click()
    
        URL.revokeObjectURL(url)
    }

    return editor
}

function getDocument(): EditorType {
    const editorJSON = localStorage.getItem(DefaultSlideSetting.localStorageItemName)
    if (editorJSON == null) {
        return createEditor()
    }

    let editor
    try {
        editor = JSON.parse(editorJSON)
    } catch (error) {
        console.error('Не удалось открыть автосохранненый файл', error)
        return createEditor()
    }

    if (editor.presentation && typeof editor.presentation.listSlides == 'object') {
        editor.presentation.listSlides = new Map(Object.entries(editor.presentation.listSlides))        
    }

    if (!isEditorValid(editor)) {
        return createEditor()
    }

    return editor as EditorType
}

function loadDocumentFromJSON(editor: EditorType, {editorJSON}: {editorJSON: string}): EditorType {
    const newEditor = JSON.parse(editorJSON)

    if (newEditor.presentation && typeof newEditor.presentation.listSlides == 'object') {
        newEditor.presentation.listSlides = new Map(Object.entries(newEditor.presentation.listSlides))
    }
    
    if (!isEditorValid(newEditor)) {
        return editor
    }

    return newEditor as EditorType
}

export {
    saveDocument,
    saveDocumentToFile,
    loadDocumentFromJSON,
    getDocument
}