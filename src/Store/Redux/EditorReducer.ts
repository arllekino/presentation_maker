import { EditorType } from '../../Types/EditorType'
import { ActionType, EditorAction } from './Action'
import { createEditor, renamePresentation, setEditor } from '../Functions/PresentationFunctions.ts'
import { getDocument, loadDocumentFromJSON, saveDocument, saveDocumentToFile } from '../Functions/DocumentFunctions.ts'
import { changeSlidePosition, createSlide, deleteSlide, selectSlide, setBackgroundColorSlide, setBackgroundImageSlide } from '../Functions/SlideFunctions.ts'
import {
    setLocking,
    resizeBlock,
    selectBlock,
    replaceImage,
    createTextBlock,
    createImageBlock,
    setOpacityToBlock,
    addBlockToSelected,
    changeBlockPosition,
    raiseOverlayPriority,
    lowerOverlayPriority,
    deleteBlocksFromSlide,
    changeTextBlockContent,
    changeTextBlockFontSize,
    deleteBlockFromSelected,
    unsetSelectedSlideObject,
    changeTextBlockFontColor,
    changeTextBlockFontFamily,
    changeTextBlockFontWeight,
} from '../Functions/SlideObjectsFunctions.ts'

const initialState = getDocument() || createEditor()

function editorReducer(editor = initialState, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.SET_EDITOR:
            return setEditor(action.payload)
        case ActionType.CREATE_SLIDE:
            return createSlide(editor)
        case ActionType.DELETE_SLIDE:
            return deleteSlide(editor, action.payload)
        case ActionType.SELECT_SLIDE:
            return selectSlide(editor, action.payload)
        case ActionType.RENAME_PRESENTATION:
            return renamePresentation(editor, action.payload)
        case ActionType.UNSET_SELECTION_SLIDE_OBJECTS:
            return unsetSelectedSlideObject(editor, action.payload)
        case ActionType.CHANGE_SLIDE_POSITION:
            return changeSlidePosition(editor, action.payload)
        case ActionType.SET_BACKGROUND_IMAGE_SLIDE:
            return setBackgroundImageSlide(editor, action.payload)
        case ActionType.SET_BACKGROUND_COLOR_SLIDE:
            return setBackgroundColorSlide(editor, action.payload)
        case ActionType.SELECT_BLOCK:
            return selectBlock(editor, action.payload)
        case ActionType.ADD_BLOCK_TO_SELECTED:
            return addBlockToSelected(editor, action.payload)
        case ActionType.DELETE_BLOCK_FROM_SELECTED:
            return deleteBlockFromSelected(editor, action.payload)
        case ActionType.RAISE_OVERLAY_PRIORITY:
            return raiseOverlayPriority(editor, action.payload)
        case ActionType.LOWER_OVERLAY_PRIORITY:
            return lowerOverlayPriority(editor, action.payload)
        case ActionType.CREATE_TEXT_BLOCK:
            return createTextBlock(editor, action.payload)
        case ActionType.CREATE_IMAGE_BLOCK:
            return createImageBlock(editor, action.payload)
        case ActionType.DELETE_BLOCKS_FROM_SLIDE:
            return deleteBlocksFromSlide(editor)
        case ActionType.SET_LOCKING:
            return setLocking(editor, action.payload)
        case ActionType.CHANGE_BLOCK_POSITION:
            return changeBlockPosition(editor, action.payload)
        case ActionType.RESIZE_BLOCK:
            return resizeBlock(editor, action.payload)
        case ActionType.SET_OPACITY_TO_BLOCK:
            return setOpacityToBlock(editor, action.payload)
        case ActionType.CHANGE_TEXT_BLOCK_CONTENT:
            return changeTextBlockContent(editor, action.payload)
        case ActionType.REPLACE_IMAGE:
            return replaceImage(editor, action.payload)
        case ActionType.CHANGE_TEXT_BLOCK_FONT_FAMILY:
            return changeTextBlockFontFamily(editor, action.payload)
        case ActionType.CHANGE_TEXT_BLOCK_FONT_SIZE:
            return changeTextBlockFontSize(editor, action.payload)
        case ActionType.CHANGE_TEXT_BLOCK_FONT_COLOR:
            return changeTextBlockFontColor(editor, action.payload)
        case ActionType.CHANGE_TEXT_BLOCK_FONT_WEIGHT:
            return changeTextBlockFontWeight(editor, action.payload)
        case ActionType.SAVE_DOCUMENT:
            return saveDocument(editor)
        case ActionType.SAVE_DOCUMENT_TO_FILE:
            return saveDocumentToFile(editor)
        case ActionType.GET_DOCUMENT:
            return getDocument()
        case ActionType.LOAD_DOCUMENT_FROM_JSON:
            return loadDocumentFromJSON(editor, action.payload)
        default:
            return editor
    }
}


export {
    editorReducer
}