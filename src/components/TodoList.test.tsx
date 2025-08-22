import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoList from "./TodoList";

describe("todo list", () => {
  it("renders correctly", () => {
    const todos = [
      { id: "1", title: "Test Todo 1", completed: false },
      { id: "2", title: "Test Todo 2", completed: true },
    ];
    const { getByText } = render(
      <TodoList todos={todos} onDelete={() => {}} />
    );

    expect(getByText("Test Todo 1")).toBeInTheDocument();
    expect(getByText("Test Todo 2")).toBeInTheDocument();
  });
  it("shows 'No todos yet!' when the list is empty", () => {
    const { getByText } = render(<TodoList todos={[]} onDelete={() => {}} />);
    expect(getByText("No todos yet!")).toBeInTheDocument();
  });
  it("calls onDelete when a todo is deleted", () => {
    const mockOnDelete = vi.fn();
    const todos = [{ id: "1", title: "Test Todo", completed: false }];
    const { getByText } = render(
      <TodoList todos={todos} onDelete={mockOnDelete} />
    );

    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
