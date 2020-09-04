import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Features/auth/authSlice';
import userReducer from './Features/auth/userSlice';
import diariesReducer from './Features/diary/diariesSlice';
import entriesReducer from './Features/entry/entriesSlice';
import editorReducer from './Features/entry/editorSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;