import { combineReducers } from "@reduxjs/toolkit";
import panelsReducer from "./panels.reducer";

const UIReducer = combineReducers({
    panels: panelsReducer
});

export default UIReducer;