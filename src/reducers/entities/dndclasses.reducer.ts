import { DndClass } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { rootApi } from "@/api/root.api";
import { dndClassApi } from '@/api/dndclasses.api';

interface DndClassesState {
    [id: string]: DndClass;
}

const initialState: DndClassesState = {};

// Session slice of state where data related to currently logged in user lives
const dndClassesSlice = createSlice({
  name: 'dndClasses',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        dndClassApi.endpoints.getAllClasses.matchFulfilled,
        (state, { payload }) => {
            payload.dndclasses.forEach( (dndClass) => {
                state[dndClass.id] = dndClass
            })
        }
      )
      .addMatcher(
        isAnyOf(
            dndClassApi.endpoints.getClassById.matchFulfilled,
            dndClassApi.endpoints.postClass.matchFulfilled,
            dndClassApi.endpoints.patchClass.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.dndclass.id] = payload.dndclass
        }
      )
      .addMatcher(
        dndClassApi.endpoints.deleteClass.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.dndclass.id]
        }
      );
  }
});

export const {
} = dndClassesSlice.actions;

export default dndClassesSlice.reducer;