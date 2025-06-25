import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  INIT_TASK,
  TOGGLE_TASK,
} from "./taskAction";

export const initialState = [];

export const taskReducer = (state, action) => {
  switch (action.type) {
    case INIT_TASK:
      return [...action.tasks];
    case ADD_TASK:
      return [...state, action.task];
    case DELETE_TASK:
      return state.filter((task) => action.id != task.id);
    case EDIT_TASK:
      return state.map((task) => {
        if (task.id === action.id) {
          return { ...task, title: action.title };
        }
        return task;
      });
    case TOGGLE_TASK:
      return state.map((task) => {
        if (task.id === action.id) {
          return { ...task, status: !task.status };
        }
        return task;
      });
    default:
      return state;
  }
};
