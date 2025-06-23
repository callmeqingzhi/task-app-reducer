import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
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
      <Box maxW="md" mx="auto" mt={10} p={4}>
        <Alert status="error" mb={4}>
          <AlertIcon />
          タスクが見つかりませんでした。
        </Alert>
        <Button onClick={() => nav("/")} colorScheme="teal">
          ホームへ戻る
        </Button>
      </Box>
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
    <Box maxW="md" mx="auto" mt={10} p={4}>
      <Heading size="md" mb={4}>
        ✏️ タスク編集（ID: {id}）
      </Heading>

      <FormControl isInvalid={!!error} mb={4}>
        <Input
          placeholder="タスク名を入力"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>

      <Button colorScheme="teal" onClick={handleEdit}>
        保存
      </Button>
    </Box>
  );
}
