import { Spell } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { spellApi } from '@/api/spells.api';

interface SpellsState {
    [id: string]: Spell;
}

const initialState: SpellsState = {};

const spellsSlice = createSlice({
  name: 'spells',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        spellApi.endpoints.getAllSpells.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (spellure) => {
                state[spellure.id] = spellure;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            spellApi.endpoints.getSpellById.matchFulfilled,
            spellApi.endpoints.postSpell.matchFulfilled,
            spellApi.endpoints.patchSpell.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      )
      .addMatcher(
        spellApi.endpoints.deleteSpell.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id];
        }
      );
  }
});

export const {
} = spellsSlice.actions;

export default spellsSlice.reducer;