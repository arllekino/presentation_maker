import Ajv from 'ajv'
import { EditorType } from '../../Types/EditorType'
import schema from './ValidateScheme'

function isEditorValid(editor: EditorType): boolean {
    const ajv = new Ajv()
    
    const isValid = ajv.validate(schema, editor) 
    
    if (!isValid) {
        console.log('error')
    }

    return isValid 
}

export default isEditorValid