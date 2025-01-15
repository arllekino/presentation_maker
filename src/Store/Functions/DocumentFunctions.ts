import { EditorType } from '../../Types/EditorType'
import { DefaultSlideSetting } from '../../Utils/DefaultSlideSettings'
import { deleteEditorDB, getEditorDB, saveEditorDB } from '../../Utils/IndexedDB/FunctionsDB'
import { EditorDatabase } from '../../Utils/IndexedDB/initDB'
import isEditorValid from '../../Utils/Validation/ValidateEditor'
import { createEditor } from './PresentationFunctions'

async function saveDocument(editor: EditorType): Promise<EditorType> {
    const listSlidesObject = Object.fromEntries(editor.presentation.listSlides)
    const editorDB: EditorDatabase = {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: listSlidesObject,
        },
    }

    if (isEditorValid(editor)) {
        try {
            await deleteEditorDB()
            await saveEditorDB(editorDB)
        } catch (error) {
            console.log(error)
        }
    }

    return editor
}

function saveDocumentToFile(editor: EditorType): EditorType {
    const filename = editor.presentation.title || DefaultSlideSetting.saveFilename + '.json'
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
        const file = new Blob([editorJSON], { type: 'application/json' })
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.click()

        URL.revokeObjectURL(url)
    }

    return editor
}

async function getDocument(): Promise<EditorType> {
    try {
        const editor = await getEditorDB()

        if (editor && isEditorValid(editor)) {
            return editor as EditorType
        }
    } catch (error) {
        console.error('Не удалось открыть автосохранненый файл', error)
        return createEditor()
    }

    return createEditor()
}

function loadDocumentFromJSON(editor: EditorType, { editorJSON }: { editorJSON: string }): EditorType {
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