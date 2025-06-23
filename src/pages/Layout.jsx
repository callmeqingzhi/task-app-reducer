import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <NavLink to="/home" style={{ marginRight: 10 }}>
          Home
        </NavLink>
        <NavLink to="/" style={{ marginRight: 10 }}>
          Tasks
        </NavLink>
        <NavLink to="/todos" style={{ marginRight: 10 }}>
          Todos
        </NavLink>
        <NavLink to="/about" style={{ marginRight: 10 }}>
          About
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
