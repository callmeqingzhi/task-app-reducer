import { NavLink, Outlet } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Box p={6}>
      <Flex as="nav" gap={4} mb={6}>
        <NavButton to="/home">Home</NavButton>
        <NavButton to="/">Tasks</NavButton>
        <NavButton to="/todos">Todos</NavButton>
        <NavButton to="/about">About</NavButton>
      </Flex>
      <Outlet />
    </Box>
  );
}

// ✅ 提取一个可复用的导航按钮组件
function NavButton({ to, children }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          colorScheme={isActive ? "teal" : "gray"}
          variant={isActive ? "solid" : "ghost"}
          size="sm"
        >
          {children}
        </Button>
      )}
    </NavLink>
  );
}
