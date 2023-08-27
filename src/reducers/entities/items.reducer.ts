import { Item } from '@/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { itemApi } from '@/api/items.api';

interface ItemsState {
    [id: string]: Item;
}

const initialState: ItemsState = {};

const itemsSlice = createSlice({
  name: 'items',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(
        itemApi.endpoints.getAllItems.matchFulfilled,
        (state, { payload }) => {
            payload.forEach( (item) => {
                state[item.id] = item;
            })
        }
      )
      .addMatcher(
        isAnyOf(
            itemApi.endpoints.getItemById.matchFulfilled,
            itemApi.endpoints.postItem.matchFulfilled,
            itemApi.endpoints.patchItem.matchFulfilled
        ),
        (state, { payload }) => {
            state[payload.id] = payload;
        }
      )
      .addMatcher(
        itemApi.endpoints.deleteItem.matchFulfilled,
        (state, { payload }) => {
            delete state[payload.id];
        }
      );
  }
});

export const {
} = itemsSlice.actions;

export default itemsSlice.reducer;