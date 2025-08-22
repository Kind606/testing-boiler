import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CreateTodo from "./CreateTodo";

describe("CreateTodo", () => {
  it("renders correctly", () => {
    render(<CreateTodo onCreate={() => {}} />);
  });

  it("should have a form with an input and a button", () => {
    const { getByRole } = render(<CreateTodo onCreate={() => {}} />);
    // expect(getByRole("form")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("should create a todo", () => {
    const mockOnCreate = vi.fn();
    const { getByRole } = render(<CreateTodo onCreate={mockOnCreate} />);

    const input = getByRole("textbox");
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(button);

    expect(mockOnCreate).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "Test Todo",
    });
  });

  it("todo should have a unique id", () => {
    const mockOnCreate = vi.fn();
    const { getByRole } = render(<CreateTodo onCreate={mockOnCreate} />);

    const input = getByRole("textbox");
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(button);

    expect(mockOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  });

  it("should not create a todo with empty title", () => {
    const mockOnCreate = vi.fn();
    const { getByRole } = render(<CreateTodo onCreate={mockOnCreate} />);

    const input = getByRole("textbox");
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  it("does not allow more than 20 characters in todo input", async () => {
    const onCreate = vi.fn();
    render(<CreateTodo onCreate={onCreate} />);
    const input = screen.getByPlaceholderText("Add a new todo");

    // Try to type more than 20 characters
    const longText = "abcdefghijklmnopqrstuvwxyz";
    await userEvent.type(input, longText);

    // Assert that only 20 characters are present in the input
    expect(input).toHaveValue(longText.slice(0, 20));
  });
});
