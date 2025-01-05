import React from 'react'
import { HistoryType } from '../../../Utils/History'

const defaultHistory: HistoryType = {
    undo: () => undefined,
    redo: () => undefined,
    undoStackSize: () => 0,
    redoStackSize: () => 0
}
const HistoryContext: React.Context<HistoryType> = React.createContext(defaultHistory)

export {
    HistoryContext,
}