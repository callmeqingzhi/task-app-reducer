import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TaskList from "./pages/TaskList";
import EditTask from "./pages/EditTask";
import TaskProvider from "./contexts/TaskProvider";
import TodoList from "./pages/TodoList";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TaskList />} />
              <Route path="todos" element={<TodoList />} />
              <Route path="edit/:id" element={<EditTask />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </div>
  );
}

export default App;
