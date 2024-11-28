import { loadDocumentFromJSON } from '../Functions/modificationFunctions'
import { dispatch } from '../Store/Editor'

const useLoadFromFileEditor = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        const fileReader = new FileReader()

        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            try {
                const editorJSON = event.target?.result
                dispatch(loadDocumentFromJSON, {editorJSON: editorJSON})
            } catch {
                console.log('Не удалось открыть файл')
            }
        }
        event.target.value = ''

        fileReader.readAsText(file)
    }

}

export default useLoadFromFileEditor