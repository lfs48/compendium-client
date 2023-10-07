import { combineReducers } from "@reduxjs/toolkit";
import panelsReducer from "./panels.reducer";
import darkmodeReducer from "./darkmode.reducer";

const UIReducer = combineReducers({
    panels: panelsReducer,
    darkmode: darkmodeReducer
});

export default UIReducer;