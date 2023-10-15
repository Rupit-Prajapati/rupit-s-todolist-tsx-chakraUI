import { useState } from "react";
import { Button, FormControl, Input, Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface FormProps {
  onTaskSubmit: (newTask: Task) => void;
}

export default function Form({ onTaskSubmit }: FormProps) {
  const [inputText, setInputText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const generateRandomId = (): number => Math.floor(Math.random() * 1000);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    const newTask: Task = {
      id: generateRandomId(),
      title: inputText,
      completed: checked,
    };
    onTaskSubmit(newTask);
    setInputText("");
    setChecked(false);
  };

  return (
    <FormControl
      as="form"
      display="flex"
      alignItems="center"
      gap={{ base: "10px", sm: "20px" }}
    >
      <Checkbox
        size={{ base: "sm", md: "md" }}
        colorScheme="green"
        isChecked={checked}
        onChange={handleCheckboxChange}
      />
      <Input
        value={inputText}
        onChange={handleTextChange}
        size={{ base: "sm", md: "md" }}
        color="black"
        variant="filled"
        placeholder="Enter your todo task"
      />
      <Button
        colorScheme="teal"
        size={{ base: "sm", md: "md" }}
        px="20px"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </FormControl>
  );
}
