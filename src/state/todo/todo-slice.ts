import { TodoState, TodoStatus } from "@/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: TodoState[] = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: TodoState = {
        id: nanoid(),
        status: "Pending",
        task: action.payload,
      };
      state.push(todo);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; task: string }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          task: action.payload.task,
        };
      }
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; status: TodoStatus }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          status: action.payload.status,
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo, updateTask, updateStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
