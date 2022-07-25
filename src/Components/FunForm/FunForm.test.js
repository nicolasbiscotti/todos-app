import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import givenThat from "../../test/givens/givenThat";
import verifyThat from "../../test/verifies/verifyThat";
import verifyThatFunction from "../../test/verifies/verifyThatFunction";
import FunForm from "./FunForm";

describe("FunForm Component", () => {
  it("should render the children function", () => {
    const textContent = "Hello World!";
    const TestForm = () => (
      <FunForm>{() => <span role="heading"> {textContent} </span>}</FunForm>
    );

    givenThat(<TestForm />).willBeRendered();

    verifyThat(screen).shouldDisplayText("heading", textContent);
  });

  it("should display the text that a user types in an input:text", async () => {
    const inputName = "title";
    const titleInitialValue = "";
    const accessibleName = "todo input";

    const TestForm = () => {
      return (
        <FunForm initialValues={{ title: titleInitialValue }}>
          {({ values, handleChange }) => (
            <label>
              {accessibleName}
              <input
                type="text"
                name={inputName}
                value={values.title}
                onChange={handleChange}
              ></input>
            </label>
          )}
        </FunForm>
      );
    };
    givenThat(<TestForm />).willBeRendered();

    const expectedValue = "Hello World!";

    const user = userEvent.setup();
    await user.click(screen.getByRole("textbox", { name: accessibleName }));
    await user.keyboard(expectedValue);

    verifyThat(screen).shouldDisplayValue(expectedValue);
  });

  it("should call the submit function with the current values of the state, when the form is submitted", async () => {
    const submitFunction = jest.fn();
    const TestForm = () => {
      return (
        <FunForm
          initialValues={{ title: "This is a title." }}
          onSubmit={submitFunction}
        >
          {({ handleSubmit }) => (
            <button onClick={handleSubmit}>Agregar</button>
          )}
        </FunForm>
      );
    };

    givenThat(<TestForm />).willBeRendered();

    await verifyThatFunction(submitFunction)
      .afterUserClickedOn({
        role: "button",
        accessibleName: "Agregar",
      })
      .shouldBeCalledTimes(1)
      .withArguments({ title: "This is a title." });
  });
});
