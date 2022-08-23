import { Race } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { rootApi } from "@/api/root.api";
import { raceApi } from '@/api/races.api';
import { merge } from 'lodash';

interface RacesReducer {
    [id: string]: Race;
}

const initialState: RacesReducer = {};

// Session slice of state where data related to currently logged in user lives
const racesSlice = createSlice({
  name: 'races',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        raceApi.endpoints.getAllRaces.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (race) => {
                const newRace = merge( {}, race );
                state[race.id] = newRace;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            raceApi.endpoints.getRaceById.matchFulfilled,
            raceApi.endpoints.postRace.matchFulfilled,
            raceApi.endpoints.patchRace.matchFulfilled
        ),
        (state, { payload }) => {
          const race = merge( {}, payload );
          state[race.id] = race;
        }
      )
      .addMatcher(
        raceApi.endpoints.deleteRace.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id]
        }
      );
  }
});

export const {
} = racesSlice.actions;

export default racesSlice.reducer;