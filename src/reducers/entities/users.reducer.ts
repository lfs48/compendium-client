import { User } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { spellApi } from '@/api/spells.api';
import { messagesApi } from '@/api/messages.api';
import { receiveMessage } from './messages.reducer';
import { authApi } from '@/api/auth.api';
import { userApi } from '@/api/users.api';

interface UsersState {
    [id: string]: User;
}

const initialState: UsersState = {};

const spellsSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
      isAnyOf(
        messagesApi.endpoints.getAllMessages.matchFulfilled
      ),
        (state, { payload }) => {
            payload.messages.forEach( ({user}) => {
                state[user.id] = user;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            receiveMessage.match,
            authApi.endpoints.login.matchFulfilled,
            authApi.endpoints.register.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.user.id] = payload.user;
        }
      )
      .addMatcher(
        isAnyOf(
            userApi.endpoints.getUserById.matchFulfilled,
            userApi.endpoints.patchUser.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      )
  }
});

export const {
} = spellsSlice.actions;

export default spellsSlice.reducer;