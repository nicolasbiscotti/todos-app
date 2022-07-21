import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  let fn = jest.fn();
  const testButtonSpec = {
    text: "Agregar",
    attributes: { className: "add-big", id: "myButton" },
  };

  it("should render the child function call and set the attributes to the button", async () => {
    const { text, attributes } = testButtonSpec;

    render(<Button attributes={attributes}>{() => text}</Button>);
    let button;
    await waitFor(() => (button = screen.getByRole("button")));

    expect(button).toHaveTextContent(text);
    expect(button).toHaveClass(attributes.className);
    expect(button).toHaveAttribute("id", attributes.id);
  });

  it("should call to the callback function passed to onCLick when clicked on it", async () => {
    const { text } = testButtonSpec;
    const todo = { title: "this is the title" };
    const callback = () => fn(todo);
    const config = { attributes: { onClick: callback } };

    render(<Button {...config}>{() => text}</Button>);
    let button;
    await waitFor(() => (button = screen.getByRole("button")));
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(todo);
  });
});
