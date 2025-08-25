import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";


import CreateTodo, { Todo } from "./components/CreateTodo";
import TodoList from "./components/TodoList";


function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });


  const handleCreate = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };


  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Vite + React
          </Typography>
        </Box>
        <CreateTodo onCreate={handleCreate} />


        <TodoList todos={todos} onDelete={handleDelete} />
      </Paper>
    </Container>
  );
}


export default App;


