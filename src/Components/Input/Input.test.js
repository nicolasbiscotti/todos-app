import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

describe("Button component", () => {
  const placeholder = "Escribí un item";
  const errorMessage = "el título no puede estar vacío";
  beforeEach(() => {
    render(
      <Input errorMessage={errorMessage}>
        {({ value, touched, errors, handleChange, handleBlur }) => (
          <label className="App-input">
            <input
              name="todo-title"
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              aria-errormessage="msgID"
              aria-invalid="true"
            />
            {errors.message && (
              <span id="msgID" aria-live="assertive">
                Info: {errors.message}
              </span>
            )}
          </label>
        )}
      </Input>
    );
  });
  it("should render without error information", async () => {
    let input;
    await waitFor(() => (input = screen.getByPlaceholderText(placeholder)));

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveErrorMessage();
  });

  it("should set the value when onChange event take place", async () => {
    let input;
    await waitFor(() => (input = screen.getByPlaceholderText(placeholder)));
    fireEvent.change(input, { target: { value: "a" } });

    expect(input).toHaveValue("a");
  });
  it("should warn if the field is not filled correctly", async () => {
    let input;
    await waitFor(() => (input = screen.getByPlaceholderText(placeholder)));
    // the field is touched and left without completing
    fireEvent.focusIn(input);
    fireEvent.focusOut(input);

    expect(input).toHaveErrorMessage(expect.stringContaining(errorMessage));
  });
  it("should hide the error message when the fiel is completed successfully", async () => {
    let input;
    await waitFor(() => (input = screen.getByPlaceholderText(placeholder)));
    // the field is touched and left without completing
    fireEvent.focusIn(input);
    fireEvent.focusOut(input);
    fireEvent.change(input, { target: { value: "a" } });

    expect(input).not.toHaveErrorMessage();
  });
});
