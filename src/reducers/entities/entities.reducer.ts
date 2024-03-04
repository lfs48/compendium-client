import { combineReducers } from "@reduxjs/toolkit";
import dndclassesReducer from "./dndclasses.reducer";
import featuresReducer from "./features.reducer";
import racesReducer from "./races.reducer";
import spellsReducer from "./spells.reducer";
import itemsReducer from "./items.reducer";
import collectionReducer from "./collection.reducer";
import messagesReducer from "./messages.reducer";

const entitiesReducer = combineReducers({
    dndClasses: dndclassesReducer,
    features: featuresReducer,
    races: racesReducer,
    spells: spellsReducer,
    items: itemsReducer,
    collections: collectionReducer,
    messages: messagesReducer
});

export default entitiesReducer;