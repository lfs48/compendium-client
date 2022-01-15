import { combineReducers } from "@reduxjs/toolkit";
import dndclassesReducer from "./dndclasses.reducer";

const entitiesReducer = combineReducers({
    dndClasses: dndclassesReducer
});

export default entitiesReducer;