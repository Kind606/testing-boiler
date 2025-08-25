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
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        maxWidth: 400,
        mx: "auto",
        backgroundColor: "#f8fafc",
        borderRadius: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        gap={2}
        sx={{ flexDirection: "column" }}
      >
        <TextField
          value={title}
          onChange={handleChange}
          size="small"
          fullWidth
          inputProps={{ maxLength: 20 }}
          placeholder="Add a new todo"
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          Add Todo
        </Button>
      </Box>
    </Paper>
  );
}


