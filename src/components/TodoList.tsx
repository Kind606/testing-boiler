import { Todo } from "./CreateTodo";
import DeleteButton from "./DeleteButton";

export default function TodoList({
  todos,
  onDelete,
}: {
  todos: Todo[];
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <h2>Todo List</h2>
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
