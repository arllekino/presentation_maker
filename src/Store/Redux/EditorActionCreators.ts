import { ImageSlideObject, TextSlideObject } from '../../Types/SlideObjectTypes'
import { ActionType } from './Action'
import { CreateImageBlockPayload, CreateTextBlockPayload } from './PayloadTypes'

function createSlide() {
    return {
        type: ActionType.CREATE_SLIDE,
    }
}

function deleteSlide() {
    return {
        type: ActionType.DELETE_SLIDE,
    }
}

function selectSlide(slideId: string) {
    return {
        type: ActionType.SELECT_SLIDE,
        payload: { slideId },
    }
}

function renamePresentation(newTitle: string) {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: { newTitle },
    }
}

function unsetSelectionSlideObjects(slideObjectId: string) {
    return {
        type: ActionType.UNSET_SELECTION_SLIDE_OBJECTS,
        payload: { slideObjectId },
    }
}

function changeSlidePosition(id: string, newPosition: number) {
    return {
        type: ActionType.CHANGE_SLIDE_POSITION,
        payload: { id, newPosition },
    }
}

function setBackgroundImageSlide(slideId: string | null, path: string) {
    return {
        type: ActionType.SET_BACKGROUND_IMAGE_SLIDE,
        payload: { slideId, path },
    }
}

function setBackgroundColorSlide(slideId: string | null, hexColor: string) {
    return {
        type: ActionType.SET_BACKGROUND_COLOR_SLIDE,
        payload: { slideId, hexColor },
    }
}

function selectBlock(blockId: string) {
    return {
        type: ActionType.SELECT_BLOCK,
        payload: { blockId },
    }
}

function addBlockToSelected(blockId: string) {
    return {
        type: ActionType.ADD_BLOCK_TO_SELECTED,
        payload: { blockId },
    }
}

function deleteBlockFromSelected(blockId: string) {
    return {
        type: ActionType.DELETE_BLOCK_FROM_SELECTED,
        payload: { blockId },
    }
}

function raiseOverlayPriority(slideObject: ImageSlideObject | TextSlideObject) {
    return {
        type: ActionType.RAISE_OVERLAY_PRIORITY,
        payload: { slideObject },
    }
}

function lowerOverlayPriority(slideObject: ImageSlideObject | TextSlideObject) {
    return {
        type: ActionType.LOWER_OVERLAY_PRIORITY,
        payload: { slideObject },
    }
}

function createTextBlock(payload: CreateTextBlockPayload) {
    return {
        type: ActionType.CREATE_TEXT_BLOCK,
        payload,
    }
}

function createImageBlock(payload: CreateImageBlockPayload) {
    return {
        type: ActionType.CREATE_IMAGE_BLOCK,
        payload,
    }
}

function deleteBlocksFromSlide() {
    return {
        type: ActionType.DELETE_BLOCKS_FROM_SLIDE,
    }
}

function setLocking(isLocked: boolean) {
    return {
        type: ActionType.SET_LOCKING,
        payload: { isLocked },
    }
}

function changeBlockPosition(newX: number, newY: number) {
    return {
        type: ActionType.CHANGE_BLOCK_POSITION,
        payload: { newX, newY },
    }
}

function resizeBlock(newWidth: number, newHeight: number) {
    return {
        type: ActionType.RESIZE_BLOCK,
        payload: { newWidth, newHeight },
    }
}

function setOpacityToBlock(newOpacity: number) {
    return {
        type: ActionType.SET_OPACITY_TO_BLOCK,
        payload: { newOpacity },
    }
}

function changeTextBlockContent(id: string, newContent: string) {
    return {
        type: ActionType.CHANGE_TEXT_BLOCK_CONTENT,
        payload: { id, newContent },
    }
}

function replaceImage(id: string, newPath: string) {
    return {
        type: ActionType.REPLACE_IMAGE,
        payload: { id, newPath },
    }
}

function changeTextBlockFontFamily(newFontFamily: string) {
    return {
        type: ActionType.CHANGE_TEXT_BLOCK_FONT_FAMILY,
        payload: { newFontFamily },
    }
}

function changeTextBlockFontSize(newFontSize: number) {
    return {
        type: ActionType.CHANGE_TEXT_BLOCK_FONT_SIZE,
        payload: { newFontSize },
    }
}

function changeTextBlockFontColor(newFontColor: string) {
    return {
        type: ActionType.CHANGE_TEXT_BLOCK_FONT_COLOR,
        payload: { newFontColor },
    }
}

function saveDocument() {
    return {
        type: ActionType.SAVE_DOCUMENT,
    }
}

function saveDocumentToFile() {
    return {
        type: ActionType.SAVE_DOCUMENT_TO_FILE,
    }
}

function getDocument() {
    return {
        type: ActionType.GET_DOCUMENT,
    }
}

function loadDocumentFromJSON(editorJSON: string) {
    return {
        type: ActionType.LOAD_DOCUMENT_FROM_JSON,
        payload: { editorJSON }
    }
}

export {
    createSlide,
    deleteSlide,
    selectSlide,
    renamePresentation,
    unsetSelectionSlideObjects,
    changeSlidePosition,
    setBackgroundImageSlide,
    setBackgroundColorSlide,
    selectBlock,
    addBlockToSelected,
    deleteBlockFromSelected,
    raiseOverlayPriority,
    lowerOverlayPriority,
    createTextBlock,
    createImageBlock,
    deleteBlocksFromSlide,
    setLocking,
    changeBlockPosition,
    resizeBlock,
    setOpacityToBlock,
    changeTextBlockContent,
    replaceImage,
    changeTextBlockFontFamily,
    changeTextBlockFontSize,
    changeTextBlockFontColor,
    saveDocument,
    saveDocumentToFile,
    getDocument,
    loadDocumentFromJSON,
}
