enum ActionType {
    CREATE_SLIDE = 'createSlide',
    DELETE_SLIDE = 'deleteSlide',
    CREATE_TEXT_BLOCK = 'createTextBlock',
    CREATE_IMAGE_BLOCK = 'createImageBlock',
    DELETE_BLOCK = 'deleteBlock',
    RENAME_PRESENTATION = 'renamePresentation',
    MAKE_BLOCK_FIXED = 'makeBlockFixed',
    CHANGE_BLOCK_POSITION = 'changeBlockPosition',
    RESIZE_BLOCK = 'resizeBlock',
    SELECT_SLIDE = 'selectSlide',
    UNSET_SELECTION_SLIDE_OBJECTS = 'unsetSelectionSlideObject',
    CHANGE_SLIDE_POSITION = 'changeSlidePosition',
    SET_BACKGROUND_IMAGE_SLIDE = 'setBackgroundImageSlide',
    SET_BACKGROUND_COLOR_SLIDE = 'setBackgroundColorSlide',
    SELECT_BLOCK = 'selectBlock',
    ADD_BLOCK_TO_SELECTED = 'addBlockToSelected',
    DELETE_BLOCK_FROM_SELECTED = 'deleteBlockFromSelected',
    RAISE_OVERLAY_PRIORITY = 'raiseOverlayPriority',
    LOWER_OVERLAY_PRIORITY = 'lowerOverlayPriority',
    DELETE_BLOCKS_FROM_SLIDE = 'deleteBlocksFromSlide',
    SET_LOCKING = 'setLocking',
    SET_OPACITY_TO_BLOCK = 'setOpacityToBlock',
    CHANGE_TEXT_BLOCK_CONTENT = 'changeTextBlockContent',
    REPLACE_IMAGE = 'replaceImage',
    CHANGE_TEXT_BLOCK_FONT_FAMILY = 'changeTextBlockFontFamily',
    CHANGE_TEXT_BLOCK_FONT_SIZE = 'changeTextBlockFontSize',
    CHANGE_TEXT_BLOCK_FONT_COLOR = 'changeTextBlockFontColor',
    SAVE_DOCUMENT = 'saveDocument',
    SAVE_DOCUMENT_TO_FILE = 'saveDocumentToFile',
    GET_DOCUMENT = 'getDocument',
    LOAD_DOCUMENT_FROM_JSON = 'loadDocumentFromJSON'
}

export {
    ActionType
}