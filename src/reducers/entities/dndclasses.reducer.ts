import { DndClass } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { dndClassApi } from '@/api/dndclasses.api';
import { sortFeatures } from '@/utils/dndClass.utils';
import { merge } from 'lodash';
import { entitiesApi } from '@/api/entities.api';

interface DndClassesState {
    [id: string]: DndClass;
}

const initialState: DndClassesState = {};

const dndClassesSlice = createSlice({
  name: 'dndClasses',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
      isAnyOf(
        dndClassApi.endpoints.getAllClasses.matchFulfilled,
        entitiesApi.endpoints.getAllEntities.matchFulfilled
      ),
      (state, { payload }) => {
        payload.dnd_classes.forEach( (dndClass) => {
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