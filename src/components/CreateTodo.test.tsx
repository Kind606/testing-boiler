import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreateTodo from "./CreateTodo";

describe("CreateTodo", () => {
  it("renders correctly", () => {
    render(<CreateTodo onCreate={() => {}} />);
  });

  it("should have a form with an input and a button", () => {
    const { getByRole } = render(<CreateTodo onCreate={() => {}} />);
    expect(getByRole("form")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("should call onCreate with a new todo when form is submitted", () => {
    const mockOnCreate = vi.fn();
    const { getByRole } = render(<CreateTodo onCreate={mockOnCreate} />);

    const input = getByRole("textbox");
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(button);

    expect(mockOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Todo",
        completed: false,
      })
    );
  });
});
