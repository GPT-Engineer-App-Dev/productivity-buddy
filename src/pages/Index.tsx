import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  List,
  ListItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaPlus, FaCheckCircle, FaTrash } from "react-icons/fa";

const Index = () => {
  interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: "No task entered",
        description: "Please enter a task before adding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container centerContent p={8}>
      <Heading mb={6}>Todo List</Heading>
      <Box mb={4} display="flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          mr={2}
        />
        <Button onClick={addTask} leftIcon={<FaPlus />} colorScheme="teal">
          Add Task
        </Button>
      </Box>
      <List spacing={3} w="100%">
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Box as="span" textDecoration={task.isCompleted ? "line-through" : "none"}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                aria-label="Complete Task"
                colorScheme={task.isCompleted ? "green" : "gray"}
                onClick={() => completeTask(task.id)}
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete Task"
                colorScheme="red"
                onClick={() => deleteTask(task.id)}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;