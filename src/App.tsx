import React, { useState, ChangeEvent } from "react";
import Form from "./Form";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack
} from "@chakra-ui/react";
import TodoTaskList from "./TodoTaskList";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectFilter, setSelectFilter] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "working Task",
      completed: true,
    },
    {
      id: 2,
      title: "Sample working Task",
      completed: false,
    },
    {
      id: 3,
      title: "bought Task",
      completed: true,
    },
    {
      id: 4,
      title: "working bought Task",
      completed: false,
    },
  ]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleClearFilter = () => {
    setSearchQuery("");
    setSelectFilter("");
  };

  const filteredTask = tasks.filter((task) => {
    const titleMatches = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (selectFilter === "completed") {
      return task.completed && titleMatches;
    } else if (selectFilter === "incompleted") {
      return !task.completed && titleMatches;
    } else {
      return titleMatches;
    }
  });

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      gap={{ base: "10px", md: "15px" }}
      mx="auto"
      maxW={{ base: "500px", md: "800px" }}
      boxShadow="xl"
      p="50px"
    >
      <Form onTaskSubmit={handleTask} />
      <Flex gap={{ base: "10px", md: "15px" }}>
        <Input
          size={{ base: "sm", md: "md" }}
          value={searchQuery}
          onChange={handleSearchChange}
          color="black"
          variant="filled"
          placeholder="Search tasks by title"
        />
        <Stack spacing={3}>
          <Select
            size={{ base: "sm", md: "md" }}
            value={selectFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectFilter(e.target.value)
            }
            placeholder="All"
          >
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
          </Select>
        </Stack>
        <Button
          colorScheme="red"
          variant="solid"
          size={{ base: "sm", md: "md" }}
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </Flex>
      <TodoTaskList
        setTasks={setTasks}
        tasks={filteredTask}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default App;
