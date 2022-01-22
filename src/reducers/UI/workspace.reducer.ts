import { WorkspaceComponent } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface WorkspaceState {
  component: WorkspaceComponent;
  data?: {
    id: string;
    dataType: string;
  }
}

const initialState = {
  component: null
} as WorkspaceState;

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: initialState,
  reducers: {
      openWorkspace: (state, {payload}) => {
        state.component = payload.component;
        state.data = payload.data;
      },
      closeWorkspace: () => {
        return initialState;
      }
  }
});

export const {
    openWorkspace,
    closeWorkspace
} = workspaceSlice.actions;
export default workspaceSlice.reducer;