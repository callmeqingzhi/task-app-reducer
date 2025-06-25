import { useEffect } from "react";
import { useTask } from "../contexts/TaskContext";
import {
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  INIT_TASK,
} from "../reducers/taskAction";

export function useTasks() {
  const { dispatch, tasks } = useTask();

  const editTask = (id, title) =>
    dispatch({ type: EDIT_TASK, title: title, id: id });
  const delTask = (id) => dispatch({ type: DELETE_TASK, id: id });
  const addTask = (task) => dispatch({ type: ADD_TASK, task: task });
  const toggleTask = (id) => dispatch({ type: TOGGLE_TASK, id: id });
  const initTask = (taskList) => dispatch({ type: INIT_TASK, tasks: taskList });

  return { editTask, delTask, addTask, toggleTask, initTask, tasks };
}
