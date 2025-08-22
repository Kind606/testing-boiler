export interface Todo {
  id: string;
  title: string;
}

import { useState } from "react";

function CreateTodo({ onCreate }: { onCreate: (todo: Todo) => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
    };

    if (!title.trim()) {
      return; 
    }
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
