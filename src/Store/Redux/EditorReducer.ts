import { EditorType } from '../../Types/EditorType'
import { ActionType, EditorAction } from './Action'
import { createEditor, renamePresentation, setEditor, setSelectedBlocks, unsetSelection } from '../Functions/PresentationFunctions.ts'
import { getDocument, loadDocumentFromJSON, saveDocument, saveDocumentToFile } from '../Functions/DocumentFunctions.ts'
import { addSlideToSelection, changeSlidePosition, createSlide, deleteSlide, makeImageBlockAsBackground, selectSlide, setBackgroundColorSlide, setBackgroundGradientSlide, setBackgroundImageSlide } from '../Functions/SlideFunctions.ts'
import {
    setLocking,
    resizeBlock,
    selectBlock,
    replaceImage,
    createTextBlock,
    createImageBlock,
    setOpacityToBlock,
    setRotationToBlock,
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
    changeTextAlignment,
} from '../Functions/SlideObjectsFunctions.ts'
import { Dispatch } from 'redux'

const initialState = await getDocument() || createEditor()

function editorReducer(editor = initialState, action: EditorAction): EditorType {


    switch (action.type) {
        case ActionType.SET_EDITOR:
            return setEditor(action.payload)
        case ActionType.CREATE_SLIDE:
            return createSlide(editor)
        case ActionType.DELETE_SLIDE:
            return deleteSlide(editor)
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
        case ActionType.SET_ROTATION_TO_BLOCK:
            return setRotationToBlock(editor, action.payload)
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
        case ActionType.SAVE_DOCUMENT_TO_FILE:
            return saveDocumentToFile(editor)
        case ActionType.LOAD_DOCUMENT_FROM_JSON:
            return loadDocumentFromJSON(editor, action.payload)
        case ActionType.CHANGE_TEXT_ALIGNMENT:
            return changeTextAlignment(editor, action.payload)
        case ActionType.UNSET_SELECTION:
            return unsetSelection(editor)
        case ActionType.SET_SELECTED_BLOCKS:
            return setSelectedBlocks(editor, action.payload)
        case ActionType.MAKE_IMAGE_BLOCK_AS_BACKGROUND:
            return makeImageBlockAsBackground(editor, action.payload)
        case ActionType.SET_BACKGROUND_GRADIENT_SLIDE:
            return setBackgroundGradientSlide(editor, action.payload)
        case ActionType.ADD_SLIDE_TO_SELECTION:
            return addSlideToSelection(editor, action.payload)
        default:
            return editor
    }
}

const loadEditor = () => async (dispatch: Dispatch<EditorAction>) => {
    const newEditor = await getDocument()
    dispatch({
        type: ActionType.SET_EDITOR,
        payload: { newEditor }
    })
}

const saveEditor = (editor: EditorType) => async () => {
    await saveDocument(editor)
}

export {
    editorReducer,
    loadEditor,
    saveEditor
}