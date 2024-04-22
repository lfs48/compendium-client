import { authApi } from '@/api/auth.api';
import { userApi } from '@/api/users.api';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

interface SessionState {
    authenticated: boolean;
    id: string;
    gm: boolean;
}

const initialState: SessionState = {
    authenticated: !!localStorage.jwt && !!localStorage.userID,
    id: localStorage.userID || '',
    gm: false
};

// Session slice of state where data related to currently logged in user lives
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    logout: state => {
        state.authenticated = false;
        state.id = "";
        state.gm = false;
        localStorage.removeItem('userID');
        localStorage.removeItem('jwt');
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
            authApi.endpoints.login.matchFulfilled,
            authApi.endpoints.register.matchFulfilled,
        ),
        (state, action) => {
            const {token, user} = action.payload;
            state.authenticated = true;
            state.id = user.id;
            state.gm = user.gm;
            localStorage.setItem('userID', user.id);
            localStorage.setItem('jwt', token);
        }
      )
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
            const {id, gm} = action.payload;
            state.authenticated = true;
            state.id = id;
            state.gm = gm;
        }
      );
  }
});

export const {
    logout
} = sessionSlice.actions;

export default sessionSlice.reducer;