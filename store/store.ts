import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import taskReducer from './task/taskSlice';

export const rootReducer = {
  user: userReducer,
  task: taskReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
