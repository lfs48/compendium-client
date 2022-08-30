import { Feat } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { featApi } from '@/api/feats.api';

interface FeatsState {
    [id: string]: Feat;
}

const initialState: FeatsState = {};

const featsSlice = createSlice({
  name: 'feats',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        featApi.endpoints.getAllFeats.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (feature) => {
                state[feature.id] = feature;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            featApi.endpoints.getFeatById.matchFulfilled,
            featApi.endpoints.postFeat.matchFulfilled,
            featApi.endpoints.patchFeat.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      )
      .addMatcher(
        featApi.endpoints.deleteFeat.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id];
        }
      );
  }
});

export const {
} = featsSlice.actions;

export default featsSlice.reducer;