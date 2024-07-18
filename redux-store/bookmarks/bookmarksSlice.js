import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bookmarksSlice = createSlice( {
  name: 'bookmarks',
  initialState: {
    bookmarkedJobs: [],
  },
  reducers: {
    setBookmarks ( state, action ) {
      state.bookmarkedJobs = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase( loadBookmarksAsync.fulfilled, ( state, action ) => {
        state.bookmarkedJobs = action.payload;
      } )
      .addCase( toggleBookmarkAsync.fulfilled, ( state, action ) => {
        state.bookmarkedJobs = action.payload;
      } );
  }
} );

// Async Thunk for loading bookmarks
export const loadBookmarksAsync = createAsyncThunk(
  'bookmarks/loadBookmarks',
  async ( _, { rejectWithValue } ) => {
    try {
      const bookmarkedJobs = await AsyncStorage.getItem( 'bookmarkedJobs' );
      if ( bookmarkedJobs ) {
        return JSON.parse( bookmarkedJobs );
      }
      return [];
    } catch ( error ) {
      return rejectWithValue( error.message );
    }
  }
);

// Async Thunk for toggling bookmark
export const toggleBookmarkAsync = createAsyncThunk(
  'bookmarks/toggleBookmark',
  async ( jobId, { getState, rejectWithValue } ) => {
    try {
      const { bookmarks } = getState();
      let updatedBookmarks;
      if ( bookmarks.bookmarkedJobs.includes( jobId ) ) {
        updatedBookmarks = bookmarks.bookmarkedJobs.filter( id => id !== jobId );
      } else {
        updatedBookmarks = [...bookmarks.bookmarkedJobs, jobId];
      }
      await AsyncStorage.setItem( 'bookmarkedJobs', JSON.stringify( updatedBookmarks ) );
      return updatedBookmarks;
    } catch ( error ) {
      return rejectWithValue( error.message );
    }
  }
);

export const { toggleBookmark, loadBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;