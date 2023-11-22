import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

test("renders App component without crashing", () => {
  render(<Box />);
});

test("Box component snapshot", () => {
  const tree = renderer
    .create(
      <Box
        id={1}
        width={100}
        height={100}
        backgroundColor="blue"
        removeBox={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
