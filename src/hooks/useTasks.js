import { useEffect } from "react";
import { useTask } from "../contexts/TaskContext";
import {
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  INIT_TASK,
} from "../reducers/taskAction";

export function useTasks(localTasks = []) {
  const { dispatch, tasks } = useTask();
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const editTask = (id, title) =>
    dispatch({ type: EDIT_TASK, title: title, id: id });
  const delTask = (id) => dispatch({ type: DELETE_TASK, id: id });
  const addTask = (title) => dispatch({ type: ADD_TASK, title: title });
  const toggleTask = (id) => dispatch({ type: TOGGLE_TASK, id: id });
  const initTask = (localTasks) =>
    dispatch({ type: INIT_TASK, tasks: localTasks });

  return { editTask, delTask, addTask, toggleTask, initTask, tasks };
}
