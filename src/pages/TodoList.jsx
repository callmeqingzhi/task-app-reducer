import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useTodo } from "../hooks/useTodo";

export default function TodoList() {
  const { todos, loading, error } = useTodo();

  return (
    <Box maxW="lg" mx="auto" mt={10} p={4}>
      <Heading size="lg" mb={6}>
        📋 Todo List
      </Heading>

      {loading && (
        <Box textAlign="center" py={10}>
          <Spinner size="lg" color="teal.500" />
        </Box>
      )}

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Stack spacing={3}>
          {todos.map((todo) => (
            <Box
              key={todo.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              bg={todo.completed ? "green.50" : "gray.50"}
            >
              <Text fontWeight="bold">{todo.title}</Text>
              <Badge
                mt={1}
                colorScheme={todo.completed ? "green" : "red"}
                variant="subtle"
              >
                {todo.completed ? "完了 ✅" : "未完了 ❌"}
              </Badge>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
