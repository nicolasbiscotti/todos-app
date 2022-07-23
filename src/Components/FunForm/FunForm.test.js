import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import givenThat from "../../test/givens/givenThat";
import verifyThat from "../../test/verifies/verifyThat";
import FunForm from "./FunForm";

describe("FunForm Component", () => {
  it("should render the children function", () => {
    const textContent = "Hello World!";
    const TestForm = () => (
      <FunForm>{() => <span role="heading"> {textContent} </span>}</FunForm>
    );

    givenThat(<TestForm />).willBeRendered();

    verifyThat(screen).displaysText("heading", textContent);
  });

  it("should display the text that a user types in an input:text", async () => {
    const inputName = "title";
    const titleInitialValue = "";
    const accessibleName = "todo input";

    const TestForm = () => {
      return (
        <FunForm initialValues={{ title: titleInitialValue }}>
          {({ values, onChange }) => (
            <label>
              {accessibleName}
              <input
                type="text"
                name={inputName}
                value={values.title}
                onChange={onChange}
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

    verifyThat(screen).displayValue(expectedValue);

    // verifyThat(screen).afterTheUserTypeIn();
  });
});
