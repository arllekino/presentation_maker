import { EditorType } from "../../Types/EditorType"
import { ImageSlideObject, TextSlideObject } from "../../Types/SlideObjectTypes"
import { ActionType } from "./ActionType"
import { CreateImageBlockPayload, CreateTextBlockPayload } from "./PayloadTypes"

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: {
        newEditor: EditorType
    }
}

type CreateSlideAction = {
    type: ActionType.CREATE_SLIDE
}

type DeleteSlideAction = {
    type: ActionType.DELETE_SLIDE,
    payload: {
        slideId: string
    }
}

type SelectSlideAction = {
    type: ActionType.SELECT_SLIDE,
    payload: {
        slideId: string
    }
}

type RenamePresentationAction = {
    type: ActionType.RENAME_PRESENTATION,
    payload: {
        newTitle: string
    }
}

type UnsetSelectionSlideObjectsAction = {
    type: ActionType.UNSET_SELECTION_SLIDE_OBJECTS,
    payload: {
        slideObjectId: string
    }
}

type ChangeSlidePositionAction = {
    type: ActionType.CHANGE_SLIDE_POSITION
    payload: {
        id: string,
        newPosition: number
    }
}

type SetBackgroundImageSlideAction = {
    type: ActionType.SET_BACKGROUND_IMAGE_SLIDE,
    payload: {
        slideId: string | null,
        path: string
    }
}

type SetBackgroundColorSlideAction = {
    type: ActionType.SET_BACKGROUND_COLOR_SLIDE,
    payload: {
        slideId: string | null,
        hexColor: string
    }
}

type SelectBlockAction = {
    type: ActionType.SELECT_BLOCK,
    payload: {
        blockId: string
    }
}

type AddBlockToSelectedAction = {
    type: ActionType.ADD_BLOCK_TO_SELECTED,
    payload: {
        blockId: string
    }
}

type DeleteBlockFromSelected = {
    type: ActionType.DELETE_BLOCK_FROM_SELECTED,
    payload: {
        blockId: string
    }
}

type RaiseOverlayPriorityAction = {
    type: ActionType.RAISE_OVERLAY_PRIORITY,
    payload: {
        slideObject: ImageSlideObject | TextSlideObject
    }
}

type LowerOverlayPriorityAction = {
    type: ActionType.LOWER_OVERLAY_PRIORITY,
    payload: {
        slideObject: ImageSlideObject | TextSlideObject
    }
}

type CreateTextBlockAction = {
    type: ActionType.CREATE_TEXT_BLOCK,
    payload: CreateTextBlockPayload
}

type createImageBlockAction = {
    type: ActionType.CREATE_IMAGE_BLOCK,
    payload: CreateImageBlockPayload
}

type DeleteBlocksFromSlideAction = {
    type: ActionType.DELETE_BLOCKS_FROM_SLIDE
}

type SetLockingAction = {
    type: ActionType.SET_LOCKING,
    payload: {
        isLocked: boolean
    }
}

type ChangeBlockPositionAction = {
    type: ActionType.CHANGE_BLOCK_POSITION,
    payload: {
        newX: number,
        newY: number
    }
}

type ResizeBlockAction = {
    type: ActionType.RESIZE_BLOCK,
    payload: {
        newWidth: number,
        newHeight: number
    }
}

type SetOpacityToBlockAction = {
    type: ActionType.SET_OPACITY_TO_BLOCK,
    payload: {
        newOpacity: number
    }
}

type ChangeTextBlockContentAction = {
    type: ActionType.CHANGE_TEXT_BLOCK_CONTENT
    payload: {
        id: string,
        newContent: string
    }
}

type ReplaceImageAction = {
    type: ActionType.REPLACE_IMAGE,
    payload: {
        id: string,
        newPath: string
    }
}

type ChangeTextBlockFontFamilyAction = {
    type: ActionType.CHANGE_TEXT_BLOCK_FONT_FAMILY,
    payload: {
        newFontFamily: string
    }
}

type ChangeTextBlockFontSizeAction = {
    type: ActionType.CHANGE_TEXT_BLOCK_FONT_SIZE,
    payload: {
        newFontSize: number
    }
}

type ChangeTextBlockFontColorAction = {
    type: ActionType.CHANGE_TEXT_BLOCK_FONT_COLOR,
    payload: {
        newFontColor: string
    }
}

type ChangeTextBlockFontWeightAction = {
    type: ActionType.CHANGE_TEXT_BLOCK_FONT_WEIGHT,
    payload: {
        newFontWeight: number
    }
}

type SaveDocumentAction = {
    type: ActionType.SAVE_DOCUMENT
}

type SaveDocumentToFileAction = {
    type: ActionType.SAVE_DOCUMENT_TO_FILE
}

type GetDocumentAction = {
    type: ActionType.GET_DOCUMENT
}

type LoadDocumentFromJSON = {
    type: ActionType.LOAD_DOCUMENT_FROM_JSON,
    payload: {
        editorJSON: string
    }
}

type EditorAction =
    | SetEditorAction
    | CreateSlideAction
    | DeleteSlideAction
    | SelectSlideAction
    | RenamePresentationAction
    | UnsetSelectionSlideObjectsAction
    | ChangeSlidePositionAction
    | SetBackgroundImageSlideAction
    | SetBackgroundColorSlideAction
    | SelectBlockAction
    | AddBlockToSelectedAction
    | DeleteBlockFromSelected
    | RaiseOverlayPriorityAction
    | LowerOverlayPriorityAction
    | CreateTextBlockAction
    | createImageBlockAction
    | DeleteBlocksFromSlideAction
    | SetLockingAction
    | ChangeBlockPositionAction
    | ResizeBlockAction
    | SetOpacityToBlockAction
    | ChangeTextBlockContentAction
    | ReplaceImageAction
    | ChangeTextBlockFontFamilyAction
    | ChangeTextBlockFontSizeAction
    | ChangeTextBlockFontColorAction
    | ChangeTextBlockFontWeightAction
    | SaveDocumentAction
    | SaveDocumentToFileAction
    | GetDocumentAction
    | LoadDocumentFromJSON


export {
    ActionType,
    type EditorAction
}