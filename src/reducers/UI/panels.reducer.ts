import { Entity } from "@/enums";
import { MAX_LEVEL, MAX_PANELS } from "@/utils/constants.utils";
import { createSlice } from "@reduxjs/toolkit";

interface PanelSlice {
  [id: string]: {
    id: string;
    panelType: Entity;
  }
}

const initialState = {} as PanelSlice;

const panelsSlice = createSlice({
  name: 'panels',
  initialState: initialState,
  reducers: {
      openPanel: (state, {payload}) => {
        if ( Object.keys(state).length < MAX_PANELS ) {
          state[payload.id] = payload;
        }
      },
      closePanel: (state, {payload}) => {
        delete state[payload.id]
      }
  }
});

export const {
    openPanel, 
    closePanel
} = panelsSlice.actions;
export default panelsSlice.reducer;