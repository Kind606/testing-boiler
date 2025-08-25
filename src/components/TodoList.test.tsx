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

  it("highlights a random todo when the button is clicked", () => {
    const todos = [
      { id: "1", title: "Test Todo 1", completed: false },
      { id: "2", title: "Test Todo 2", completed: true },
    ];
    const { getByText, getByRole } = render(
      <TodoList todos={todos} onDelete={() => {}} />
    );

    const button = getByRole("button", { name: /Highlight Random Todo/i });
    fireEvent.click(button);

    // Check if one of the todos is highlighted
    expect(getByText("Test Todo 1")).toBeInTheDocument();
    expect(getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("does not highlight todos when the button is clicked and all are completed", () => {
    const todos = [
      { id: "1", title: "Test Todo 1", completed: true },
      { id: "2", title: "Test Todo 2", completed: true },
    ];
    const { getByText, getByRole } = render(
      <TodoList todos={todos} onDelete={() => {}} />
    );

    const button = getByRole("button", { name: /Highlight Random Todo/i });
    fireEvent.click(button);

    // Check if none of the todos are highlighted
    expect(getByText("Test Todo 1")).toBeInTheDocument();
    expect(getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("highlights 'Test Todo 2'", () => {
    // Mock Math.random to always return 0.4 (which will select index 1)
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    const todos = [
      { id: "1", title: "Test Todo 1", completed: false },
      { id: "2", title: "Test Todo 2", completed: true },
      { id: "3", title: "Test Todo 3", completed: false },
    ];
    const { getByText, getByRole } = render(
      <TodoList todos={todos} onDelete={() => {}} />
    );
    const button = getByRole("button", { name: /Highlight Random Todo/i });
    fireEvent.click(button);
    // Assert that 'Test Todo 2' is highlighted
    expect(getByText("Highlighted: Test Todo 2")).toBeInTheDocument();
    // Restore Math.random after the test
    vi.spyOn(Math, "random").mockRestore();
  });
});
