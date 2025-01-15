import {openDB, DBSchema, IDBPDatabase} from 'idb'
import { SlideType } from '../../Types/SlideType';

type EditorDatabase =  {
    presentation: {
        listSlides: {
            [k: string]: SlideType
        }
        title: string
        orderedSlideIds: string[]
    }
    selectedSlideIds: string[]
    selectedBlockIds: string[]
}

interface PresentationDB extends DBSchema {
    presentation: {
        key: string
        value: EditorDatabase
    }
}

const initDB = async (): Promise<IDBPDatabase<PresentationDB>> => {
    return openDB<PresentationDB>('PresentationDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('presentation')) {
                db.createObjectStore('presentation', {keyPath: 'id'})
            }
        }
    })
}

export default initDB

export type {
    EditorDatabase
}