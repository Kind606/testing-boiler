import { useEffect, useState } from "react";
import CounterButton from "./components/CounterButton";
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
    <div>
      <h1>Vite + React</h1>
      <CreateTodo onCreate={handleCreate} />

      <TodoList todos={todos} onDelete={handleDelete} />

      <CounterButton />
    </div>
  );
}

export default App;
