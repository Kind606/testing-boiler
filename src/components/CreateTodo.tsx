import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";

export type Todo = {
  id: string;
  title: string;
};

export default function CreateTodo({
  onCreate,
}: {
  onCreate: (todo: Todo) => void;
}) {
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ id: crypto.randomUUID(), title: title.trim() });
    setTitle("");
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, maxWidth: 450, mx: "auto" }}>
      <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} sx={{ flexDirection: 'column' }}>
        <TextField
          label="Add a new todo"
          value={title}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </Box>
    </Paper>
  );
}
