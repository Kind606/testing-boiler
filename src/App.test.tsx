import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("should renders headline", () => {
    render(<App />);
    const headline = screen.getByText("Vite + React");
    expect(headline).toBeInTheDocument();
  });

  it("should test handleCreate function", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add Todo");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);
    const todo = screen.getByText("New Todo");
    expect(todo).toBeInTheDocument();
  });

  it("should test handleDelete function", () => {
    render(<App />);
    const todo = screen.getByText("New Todo");
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(todo).not.toBeInTheDocument();
  });

});
