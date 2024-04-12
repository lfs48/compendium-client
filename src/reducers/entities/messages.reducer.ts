import { Message } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { chatsApi } from '@/api/messages.api';

interface MessagesState {
  [id: string]: Message;
}

const initialState: MessagesState = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
      isAnyOf(
        chatsApi.endpoints.getAllMessages.matchFulfilled
      ),
        (state, { payload }) => {
          payload.messages.forEach( (message) => {
                state[message.id] = message;
          })
        })
      .addMatcher(
        isAnyOf(
            chatsApi.endpoints.postMessage.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      );
  }
});

export const {
} = messagesSlice.actions;

export default messagesSlice.reducer;