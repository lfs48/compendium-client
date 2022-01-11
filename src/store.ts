/**
 * Create the store with dynamic reducers
 */

 import { configureStore, Middleware } from '@reduxjs/toolkit';
 import logger from 'redux-logger';
 import rootReducer from './reducers/root.reducer';
 import { rootApi } from '@/api/root.api';
 
 export function configureAppStore(preloadedState={}) {
   // Create the store with middleware
   const middlewares:Middleware[] = [];
   middlewares.push(rootApi.middleware);
   if (process.env.NODE_ENV !== 'production') {
     middlewares.push(logger);
   }
 
   const store = configureStore({
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
     devTools: process.env.NODE_ENV !== 'production',
     preloadedState: preloadedState
   });
 
   return store;
 }