import { DndClass } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { rootApi } from "@/api/root.api";
import { dndClassApi } from '@/api/dndclasses.api';
import { sortFeatures } from '@/utils/dndClass.utils';
import { merge } from 'lodash';

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
            payload.forEach( (dndClass) => {
                const newClass = merge( {}, dndClass );
                newClass.features = sortFeatures(dndClass);
                state[dndClass.id] = newClass;
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
          const dndClass = merge( {}, payload );
          dndClass.features = sortFeatures(dndClass);
          state[dndClass.id] = dndClass;
        }
      )
      .addMatcher(
        dndClassApi.endpoints.deleteClass.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id]
        }
      );
  }
});

export const {
} = dndClassesSlice.actions;

export default dndClassesSlice.reducer;