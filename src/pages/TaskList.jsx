import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";

export default function TaskList() {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  const { delTask, addTask, toggleTask, initTask, tasks } =
    useTasks(localTasks);
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    if (localTasks) {
      initTask(localTasks);
    }
  }, []);

  const nav = useNavigate();
  const handleAdd = () => {
    addTask(input);
    setInput("");
  };

  const handleDel = (id) => delTask(id);
  const handleToggle = (id) => toggleTask(id);

  const filterList = tasks.filter((task) => {
    if (filter == "active") return !task.archived;
    if (filter == "archived") return task.archived;
    return true;
  });

  return (
    <div>
      <h1>📝 useReducer 任务列表</h1>
      <div className="space-x-2">
        <button
          className={filter === "active" ? "font-bold underline" : ""}
          onClick={() => setSearchParams({ filter: "active" })}
        >
          active
        </button>
        <button
          className={filter === "archived" ? "font-bold underline" : ""}
          onClick={() => setSearchParams({ filter: "archived" })}
        >
          archived
        </button>
        <button
          className={filter === "all" ? "font-bold underline" : ""}
          onClick={() => setSearchParams({ filter: "all" })}
        >
          all
        </button>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>add task</button>
      <ul>
        {filterList.map((task) => (
          <li key={task.id}>
            {task.title}:{task.archived ? "true" : "false"}
            <button onClick={() => handleDel(task.id)}>delete</button>
            <button onClick={() => nav(`/edit/${task.id}`)}>edit</button>
            <button onClick={() => handleToggle(task.id)}>toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
