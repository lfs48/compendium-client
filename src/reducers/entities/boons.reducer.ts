import { Boon } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { boonApi } from '@/api/boons.api';

interface BoonsState {
    [id: string]: Boon;
}

const initialState: BoonsState = {};

const boonsSlice = createSlice({
  name: 'boons',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        boonApi.endpoints.getAllBoons.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (boon) => {
                state[boon.id] = boon;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            boonApi.endpoints.getBoonById.matchFulfilled,
            boonApi.endpoints.postBoon.matchFulfilled,
            boonApi.endpoints.patchBoon.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      )
      .addMatcher(
        boonApi.endpoints.deleteBoon.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id];
        }
      );
  }
});

export const {
} = boonsSlice.actions;

export default boonsSlice.reducer;