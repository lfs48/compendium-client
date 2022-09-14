import { combineReducers } from "@reduxjs/toolkit";
import boonsReducer from "./boons.reducer";
import dndclassesReducer from "./dndclasses.reducer";
import featsReducer from "./feats.reducer";
import featuresReducer from "./features.reducer";
import racesReducer from "./races.reducer";

const entitiesReducer = combineReducers({
    dndClasses: dndclassesReducer,
    features: featuresReducer,
    races: racesReducer,
    feats: featsReducer,
    boons: boonsReducer
});

export default entitiesReducer;