import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Todo } from "./CreateTodo";
import DeleteButton from "./DeleteButton";

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
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 400,
        margin: "auto",
        mt: 4,
        backgroundColor: "#f9fafb",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Todo List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleHighlightRandom}
        sx={{ mb: 2, textTransform: "none", borderRadius: 2 }}
      >
        Highlight Random Todo
      </Button>
      <Typography
        variant="subtitle1"
        color={highlighted ? "secondary" : "text.secondary"}
        sx={{
          mb: 2,
          fontStyle: highlighted ? "italic" : "normal",
          fontWeight: highlighted ? 500 : 400,
        }}
      >
        {highlighted
          ? `Highlighted: ${highlighted.title}`
          : "No todo highlighted"}
      </Typography>
      {todos.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No todos yet!
        </Typography>
      )}
      <List sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: 1 , overflow: 'auto', maxHeight: 200}}>
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
              boxShadow: highlighted && highlighted.id === todo.id ? 2 : 0,
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            secondaryAction={<DeleteButton onClick={() => onDelete(todo.id)} />}
          >
            <Box
              sx={{
                fontWeight:
                  highlighted && highlighted.id === todo.id ? 600 : 400,
              }}
            >
              {todo.title}
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
