import React from "react";
import { render } from "@testing-library/react";
import BoxList from "./Boxlist";

test("renders App component without crashing", () => {
  render(<BoxList />);
});
