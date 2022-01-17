import { GameEntity } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface Panel {
  id: string;
  panelType: GameEntity;
  editing: boolean;
}

const initialState = [] as Panel[]

const panelsSlice = createSlice({
  name: 'panels',
  initialState: initialState,
  reducers: {
      openPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        if (i >= 0) {
          state.push(state.splice(i, 1)[0]);
        } else {
          state.push({
            id: action.payload.id,
            panelType: action.payload.panelType,
            editing: false
          });
        }
      },
      closePanel: (state, action) => {
        return state.filter( (panel) => panel.id !== action.payload.id);
      },
      editPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        state[i].editing = true;
      },
      viewPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        state[i].editing = false;
      },
      selectPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        state.push(state.splice(i, 1)[0]);
      }
  }
});

export const {
    openPanel, 
    closePanel, 
    editPanel, 
    viewPanel, 
    selectPanel
} = panelsSlice.actions;
export default panelsSlice.reducer;