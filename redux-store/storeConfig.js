import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from '../redux-store/bookmarks/bookmarksSlice';

export const store = configureStore( {
  reducer: {
    bookmarks: bookmarksReducer,
  },
} );