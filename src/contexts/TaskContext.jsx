import { createContext, useContext } from "react";

export const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);
