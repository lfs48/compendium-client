import { combineReducers } from "@reduxjs/toolkit";
import dndclassesReducer from "./dndclasses.reducer";
import featuresReducer from "./features.reducer";
import racesReducer from "./races.reducer";

const entitiesReducer = combineReducers({
    dndClasses: dndclassesReducer,
    features: featuresReducer,
    races: racesReducer
});

export default entitiesReducer;