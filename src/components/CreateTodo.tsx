export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

import { useState } from "react";

function CreateTodo({ onCreate }: { onCreate: (todo: Todo) => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    onCreate(newTodo);
    setTitle("");

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button className="AddButton" type="submit">
        Add Todo
      </button>
    </form>
  );
}

export default CreateTodo;
