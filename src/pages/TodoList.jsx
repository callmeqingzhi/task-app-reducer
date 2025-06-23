import { useTodo } from "../hooks/useTodo";

export default function TodoList() {
  const { todos, loading, error } = useTodo();

  return (
    <div>
      <h1>📋 Todo List</h1>
      {loading && <p>loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
