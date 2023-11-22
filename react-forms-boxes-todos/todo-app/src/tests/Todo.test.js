import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "../pages/Todo";

test("Todo component snapshot", () => {
  const tree = render
    .create(<Todo id={1} task="Example Task" removeTodo={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("clicking the remove button calls removeTodo", () => {
  const removeTodoMock = jest.fn();
  const { getByText } = render(
    <Todo id={1} task="Example Task" removeTodo={removeTodoMock} />
  );

  // Click the "X" button to remove the todo
  const removeButton = getByText("X");
  fireEvent.click(removeButton);

  // Check if removeTodoMock was called with the correct arguments
  expect(removeTodoMock).toHaveBeenCalledWith(1);
});
