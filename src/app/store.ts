import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
