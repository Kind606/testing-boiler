import { useState } from "react";
import { Todo } from "./CreateTodo";
import DeleteButton from "./DeleteButton";
import { Button, Typography, Paper, List, ListItem, Box } from "@mui/material";

export default function TodoList({
  todos,
  onDelete,
}: {
  todos: Todo[];
  onDelete: (id: string) => void;
}) {
  const [highlighted, setHighlighted] = useState<Todo | null>(null);

  const handleHighlightRandom = () => {
    if (todos.length === 0) {
      setHighlighted(null);
      return;
    }
    const index = Math.floor(Math.random() * todos.length);
    setHighlighted(todos[index]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 450, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Todo List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleHighlightRandom}
        sx={{ mb: 2 }}
      >
        Highlight Random Todo
      </Button>
      <Typography
        variant="subtitle1"
        color={highlighted ? "secondary" : "text.secondary"}
        sx={{ mb: 2 }}
      >
        {highlighted
          ? `Highlighted: ${highlighted.title}`
          : "No todo highlighted"}
      </Typography>
      {todos.length === 0 && (
        <Typography color="text.secondary">No todos yet!</Typography>
      )}
      <List
        sx={{ maxHeight: 150, overflowY: "auto", bgcolor: "background.paper" }}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              bgcolor:
                highlighted && highlighted.id === todo.id
                  ? "secondary.light"
                  : "background.paper",
              borderRadius: 1,
              mb: 1,
            }}
            secondaryAction={<DeleteButton onClick={() => onDelete(todo.id)} />}
          >
            <Box>{todo.title}</Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
