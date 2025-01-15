import { EditorType } from '../../Types/EditorType'
import initDB, { EditorDatabase } from './initDB'

async function saveEditorDB(editorDB: EditorDatabase) {
    const editorWithId = {
        ...editorDB,
        id: 'id'
    }

    const db = await initDB()
    await db.put('presentation', editorWithId)
}

async function getEditorDB(): Promise<EditorType | undefined> {
    const db = await initDB()
    const dbEditor = await db.get('presentation', 'id') 
    if (dbEditor) {
        return toEditorType(dbEditor)
    }
}

async function deleteEditorDB() {
    const db = await initDB()
    await db.delete('presentation', 'id')
}

function toEditorType(dbEditor: EditorDatabase): EditorType {    
    return {
        presentation: {
            listSlides: new Map(Object.entries(dbEditor.presentation.listSlides)),
            title: dbEditor.presentation.title,
            orderedSlideIds: dbEditor.presentation.orderedSlideIds,
        },
        selectedSlideIds: dbEditor.selectedSlideIds,
        selectedBlockIds: dbEditor.selectedBlockIds,
    };
}


export {
    saveEditorDB,
    getEditorDB,
    deleteEditorDB
}