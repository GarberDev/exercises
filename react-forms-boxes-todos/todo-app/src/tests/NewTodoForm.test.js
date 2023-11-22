import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "../pages/NewTodoForm";

test("form submission adds a new todo", () => {
  const addTodoMock = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <NewTodoForm addTodo={addTodoMock} />
  );

  // Fill out the form
  const input = getByPlaceholderText("Enter task");
  fireEvent.change(input, { target: { value: "New Task" } });

  // Submit the form
  const addButton = getByText("Add Todo");
  fireEvent.click(addButton);

  // Check if addTodoMock was called with the correct arguments
  expect(addTodoMock).toHaveBeenCalledWith({
    id: expect.any(Number),
    task: "New Task",
  });
});
