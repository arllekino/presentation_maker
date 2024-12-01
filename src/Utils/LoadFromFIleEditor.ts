import { useAppActions } from '../Store/Hooks/useAppActions'

const useLoadFromFileEditor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { loadDocumentFromJSON } = useAppActions() // Place the hook call here
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    const loadFile = async () => {
        if (file) {
            const fileReader = new FileReader()

            fileReader.onload = (event: ProgressEvent<FileReader>) => {
                try {
                    const editorJSON = event.target?.result as string
                    loadDocumentFromJSON(editorJSON)
                } catch {
                    console.log('Не удалось открыть файл')
                }
            }

            event.target.value = '' // Clear the input value

            fileReader.readAsText(file)
        }
    }

    loadFile() // Call the async function here
}

export default useLoadFromFileEditor