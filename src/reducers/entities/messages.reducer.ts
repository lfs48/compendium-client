import { Message } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { messagesApi } from '@/api/messages.api';
import { merge } from 'lodash';

interface MessagesState {
  [id: string]: Message;
}

const initialState: MessagesState = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    receiveMessage: (state, { payload }) => {
      const newMessage = merge({}, payload) as Message;
      newMessage.user = payload.user.id;
      state[payload.id] = newMessage;
    }
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(
      isAnyOf(
        messagesApi.endpoints.getAllMessages.matchFulfilled
      ),
        (state, { payload }) => {
          payload.messages.forEach( (message) => {
            const newMessage = merge({}, message) as Message;
            newMessage.user = message.user.id;
            state[message.id] = newMessage;
          })
        })
      .addMatcher(
        isAnyOf(
          messagesApi.endpoints.postMessage.matchFulfilled
        ),
        (state, { payload }) => {
          const newMessage = merge({}, payload) as Message;
          newMessage.user = payload.user.id;
          state[payload.id] = newMessage;
        }
      );
  }
});

export const {
  receiveMessage
} = messagesSlice.actions;

export default messagesSlice.reducer;