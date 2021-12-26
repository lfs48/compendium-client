import { createSlice } from '@reduxjs/toolkit';

interface SessionState {
    authenticated: boolean;
    id: string;
}

const initialState: SessionState = {
    authenticated: !!localStorage.jwt && !!localStorage.userID,
    id: localStorage.userID || ""
};

// Session slice of state where data related to currently logged in user lives
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
        const {id, jwt} = action.payload;
        state.authenticated = true;
        state.id = id;
        localStorage.setItem('userID', id);
        localStorage.setItem('jwt', jwt)
    },
    logout: state => {
        state.authenticated = false;
        state.id = "";
        localStorage.removeItem('userID');
        localStorage.removeItem('jwt');
    }
  },
});

export const {
    login,
    logout
} = sessionSlice.actions;

export default sessionSlice.reducer;