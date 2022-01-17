import { Feature } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { featureApi } from '@/api/features.api';

interface FeaturesState {
    [id: string]: Feature;
}

const initialState: FeaturesState = {};

const featuresSlice = createSlice({
  name: 'features',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        featureApi.endpoints.getAllFeatures.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (feature) => {
                state[feature.id] = feature;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            featureApi.endpoints.getFeatureById.matchFulfilled,
            featureApi.endpoints.postFeature.matchFulfilled,
            featureApi.endpoints.patchFeature.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      )
      .addMatcher(
        featureApi.endpoints.deleteFeature.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id];
        }
      );
  }
});

export const {
} = featuresSlice.actions;

export default featuresSlice.reducer;