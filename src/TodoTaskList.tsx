import {
  Button,
  Checkbox,
  Flex,
  Input,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoTaskListProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
  handleDelete: (id: number) => void;
}

const TodoTaskList: React.FC<TodoTaskListProps> = ({
  setTasks,
  tasks,
  handleDelete,
}) => {
  const [editWithId, setEditWithId] = useState<number | null>(null);
  const [editWithText, setEditWithText] = useState<string>("");
  const [editWithChecked, setEditWithChecked] = useState<boolean>(true);

  const handleEdit = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditWithId(id);
      setEditWithChecked(task.completed);
      setEditWithText(task.title);
    }
  };

  const handleSave = (id: number) => {
    setEditWithId(null);
    if (editWithText.trim() === "") return;
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: editWithText,
            completed: editWithChecked,
          }
        : task
    );

    setTasks(updatedTasks);
  };

  return (
    <List spacing={3}>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          display="flex"
          gap={{ base: "10px", md: "15px" }}
          color="green"
        >
          {editWithId === task.id ? (
            <Checkbox
              size={{ base: "sm", md: "md" }}
              colorScheme="green"
              onChange={() => setEditWithChecked(!editWithChecked)}
              isChecked={editWithChecked}
            />
          ) : (
            <Checkbox
              size={{ base: "sm", md: "md" }}
              colorScheme="green"
              isChecked={task.completed}
            />
          )}
          <Flex
            justify="space-between"
            align="center"
            gap={{ base: "10px", md: "15px" }}
            w="100%"
          >
            {editWithId === task.id ? (
              <Input
                value={editWithText}
                onChange={(e) => setEditWithText(e.target.value)}
                size={{ base: "sm", md: "md" }}
                color="black"
                variant="filled"
                placeholder="Enter your todo task"
              />
            ) : (
              <Text fontSize={{ base: "md", md: "lg" }}>{task.title}</Text>
            )}
            <Stack
              direction="row"
              gap={{ base: "10px", md: "15px" }}
              align="center"
            >
              {editWithId === task.id ? (
                <Button
                  size={{ base: "sm", md: "md" }}
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => handleSave(task.id)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  size={{ base: "sm", md: "md" }}
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit
                </Button>
              )}
              <Button
                size={{ base: "sm", md: "md" }}
                colorScheme="teal"
                variant="outline"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </Stack>
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoTaskList;
