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
    <div>
      <h2>Todo List</h2>
      <button onClick={handleHighlightRandom}>Highlight Random Todo</button>
      <p>
        {highlighted
          ? `Highlighted: ${highlighted.title}`
          : "No todo highlighted"}
      </p>
      {todos.length === 0 && <p>No todos yet!</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} <DeleteButton onClick={() => onDelete(todo.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
