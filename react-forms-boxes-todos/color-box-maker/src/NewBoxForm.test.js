import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

test("form submission adds a new box", () => {
  const addBoxMock = jest.fn();
  const { getByLabelText, getByText } = render(
    <NewBoxForm addBox={addBoxMock} />
  );

  // Fill out form inputs
  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");
  fireEvent.change(widthInput, { target: { value: "100" } });
  fireEvent.change(heightInput, { target: { value: "100" } });
  fireEvent.change(colorInput, { target: { value: "red" } });

  // Submit the form
  const addButton = getByText("Add Box");
  fireEvent.click(addButton);

  // Check if addBoxMock was called with the correct arguments
  expect(addBoxMock).toHaveBeenCalledWith({
    width: "100",
    height: "100",
    backgroundColor: "red",
    id: expect.any(Number), // Assuming you generate unique IDs
  });
});
