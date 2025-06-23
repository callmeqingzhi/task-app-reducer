import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export function useTodo(limit = 5) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fentchTodos = async () => {
      try {
        setLoading(true);
        const todos = await axios.get(`/todos?_limit=${limit}`);
        setTodos(todos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fentchTodos();
  }, []);

  return { todos, loading, error };
}
