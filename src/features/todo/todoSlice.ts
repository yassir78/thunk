import { RootState } from './../../app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from './todo';
import { fetchTodos } from './todoApi';

export interface TodoState {
    todos: Todo[],
    loading: boolean,
    error: string | null
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
};


export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    const response = await fetchTodos();
    console.log(response)
    return response;
});

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.title !== action.payload);
        },
        completeTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.title === action.payload);
            if (todo) {
                todo.completed = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadTodos.fulfilled, (state, action) => {
                console.log("reducer")
                state.loading = false;
                console.log(action)
                state.todos = action.payload;
            });
    }
})
export const { addTodo, removeTodo, completeTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectLoading = (state: RootState) => state.todos.loading;

export default todoSlice.reducer;
