import {
  Box,
  Heading,
  Input,
  Button,
  ButtonGroup,
  Stack,
  List,
  ListItem,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
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
    <Box maxW="xl" mx="auto" mt={10} p={6}>
      <Heading size="lg" mb={6}>
        📝 useReducer 任务列表
      </Heading>

      {/* 过滤按钮 */}
      <ButtonGroup mb={4} isAttached variant="outline">
        {["active", "archived", "all"].map((f) => (
          <Button
            key={f}
            onClick={() => setSearchParams({ filter: f })}
            colorScheme={filter === f ? "teal" : "gray"}
            variant={filter === f ? "solid" : "outline"}
          >
            {f}
          </Button>
        ))}
      </ButtonGroup>

      {/* 输入框 */}
      <Flex mb={6} gap={2}>
        <Input
          placeholder="新しいタスクを入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAdd} colorScheme="teal">
          追加
        </Button>
      </Flex>

      {/* 任务列表 */}
      <List spacing={4}>
        {filterList.map((task) => (
          <ListItem
            key={task.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg={task.archived ? "gray.100" : "white"}
            boxShadow="sm"
          >
            <Flex align="center">
              <Box>
                <Heading size="sm">{task.title}</Heading>
                <Badge mt={1} colorScheme={task.archived ? "gray" : "green"}>
                  {task.archived ? "归档済み" : "作業中"}
                </Badge>
              </Box>
              <Spacer />
              <Stack direction="row" spacing={2}>
                <Button size="sm" onClick={() => nav(`/edit/${task.id}`)}>
                  編集
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => delTask(task.id)}
                >
                  削除
                </Button>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() => toggleTask(task.id)}
                >
                  トグル
                </Button>
              </Stack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
