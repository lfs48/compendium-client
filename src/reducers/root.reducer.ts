import { combineReducers } from "@reduxjs/toolkit";
import { rootApi } from "@/api/root.api";
import sessionReducer from "./session.reducer";
import entitiesReducer from "./entities/entities.reducer";

const rootReducer = combineReducers({
    [rootApi.reducerPath]: rootApi.reducer,
    session: sessionReducer,
    entities: entitiesReducer
});

export default rootReducer;