import { Collection } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { collectionApi } from '@/api/collections.api';
import { merge } from 'lodash';

interface CollectionsState {
    [id: string]: Collection;
}

const initialState: CollectionsState = {};

const CollectionsSlice = createSlice({
  name: 'collections',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        collectionApi.endpoints.getAllUserCollections.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (collection) => {
                state[collection.id] = collection;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            collectionApi.endpoints.getCollectionById.matchFulfilled,
            collectionApi.endpoints.postCollection.matchFulfilled,
            collectionApi.endpoints.patchCollection.matchFulfilled
        ),
        (state, { payload }) => {
          state[payload.id] = payload;
        }
      )
      .addMatcher(
        collectionApi.endpoints.deleteCollection.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id]
        }
      );
  }
});

export const {
} = CollectionsSlice.actions;

export default CollectionsSlice.reducer;