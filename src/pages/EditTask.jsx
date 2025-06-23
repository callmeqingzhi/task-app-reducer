import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function EditTask() {
  const { editTask, tasks } = useTasks();
  const [input, setInput] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setInput(task.title);
    } else {
      setNotFound(true);
    }
  }, [id, tasks]);

  if (notFound) {
    return (
      <div>
        <p style={{ color: "red" }}>タスクが見つかりませんでした。</p>
        <button onClick={() => nav("/")}>return home</button>
      </div>
    );
  }

  const handleEdit = () => {
    if (!input.trim()) {
      setError("value is blank!");
    } else {
      editTask(id, input);
      nav("/");
    }
  };

  return (
    <div>
      {id}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleEdit}>save</button>
    </div>
  );
}
