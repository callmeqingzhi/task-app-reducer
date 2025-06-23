import { useReducer } from "react";
import { taskReducer, initialState } from "../reducers/reducer";
import { TaskContext } from "./TaskContext";

export default function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
