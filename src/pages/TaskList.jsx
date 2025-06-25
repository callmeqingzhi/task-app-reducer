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
import axiosTask from "../utils/axiosTask";

export default function TaskList() {
  const { delTask, addTask, toggleTask, initTask, tasks } = useTasks([]);
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    const fentchTasks = async () => {
      const taskList = await axiosTask.get("tasks");
      initTask(taskList);
    };
    fentchTasks();
  }, []);

  const nav = useNavigate();
  const handleAdd = async () => {
    const newTask = await axiosTask.post("tasks", {
      title: input,
      comment: "",
      status: false,
    });
    addTask(newTask);
    setInput("");
  };

  const handleDel = async (id) => {
    await axiosTask.delete(`tasks/${id}`);
    delTask(id);
  };

  const handleToggle = async (id) => {
    await axiosTask.patch(`tasks/${id}/toggle`);
    toggleTask(id);
  };

  const filterList = tasks.filter((task) => {
    if (filter == "active") {
      return !task.status;
    } else if (filter == "archived") {
      return task.status;
    } else {
      return true;
    }
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
            bg={task.status ? "gray.100" : "white"}
            boxShadow="sm"
          >
            <Flex align="center">
              <Box>
                <Heading size="sm">{task.title}</Heading>
                <Badge mt={1} colorScheme={task.status ? "gray" : "green"}>
                  {task.status ? "归档済み" : "作業中"}
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
                  onClick={() => handleDel(task.id)}
                >
                  削除
                </Button>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() => handleToggle(task.id)}
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
