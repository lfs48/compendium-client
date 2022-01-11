import { combineReducers } from "@reduxjs/toolkit";
import { rootApi } from "@/api/root.api";
import sessionReducer from "./session.reducer";

const rootReducer = combineReducers({
    [rootApi.reducerPath]: rootApi.reducer,
    session: sessionReducer
});

export default rootReducer;