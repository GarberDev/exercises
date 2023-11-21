import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
// Carousel.test.js

test("renders without crashing", () => {
  render(<Carousel />);
});
test("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

test("left arrow moves to the previous image", () => {
  const { queryByTestId, getByAltText } = render(<Carousel />);

  // Move to the second image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // Get the image alt text to ensure we are on the second image
  expect(
    getByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();

  // Click on the left arrow
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // Check if the first image is displayed again
  expect(getByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

test("left arrow is hidden on the first image", () => {
  const { queryByTestId } = render(<Carousel photos={photos} />);
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).not.toBeInTheDocument();
});

test("right arrow is hidden on the last image", () => {
  const { queryByTestId } = render(<Carousel photos={photos} />);
  const rightArrow = queryByTestId("right-arrow");

  // Move to the last image
  photos.forEach(() => {
    fireEvent.click(rightArrow);
  });

  expect(rightArrow).not.toBeInTheDocument();
});
