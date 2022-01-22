import { combineReducers } from "@reduxjs/toolkit";
import panelsReducer from "./panels.reducer";
import workspaceReducer from "./workspace.reducer";

const UIReducer = combineReducers({
    panels: panelsReducer,
    workspace: workspaceReducer
});

export default UIReducer;