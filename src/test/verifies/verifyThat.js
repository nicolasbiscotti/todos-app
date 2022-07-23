import userEvent from "@testing-library/user-event";

const verifyThat = (screen) => {
  // const user = userEvent.setup();
  const verify = {};

  const displaysText = (expectedRole, expectedAccessibleName) => {
    expect(
      screen.getByRole(expectedRole, { name: expectedAccessibleName })
    ).toBeInTheDocument();
  };
  const displayValue = (expectedValue) => {
    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  };

  // const afterTheUserTypeIn = async (textboxName) => {
  //   await user.click(screen.getByRole("textbox", { name: textboxName }));
  //   return verify;
  // };

  verify.displaysText = displaysText;
  verify.displayValue = displayValue;
  //verify.afterTheUserTypeIn = afterTheUserTypeIn;

  return verify;
};
export default verifyThat;
