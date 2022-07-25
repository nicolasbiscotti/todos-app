import userEvent from "@testing-library/user-event";

const verifyThat = (screen) => {
  const verify = {};

  const shouldDisplayText = (expectedRole, expectedAccessibleName) => {
    expect(
      screen.getByRole(expectedRole, { name: expectedAccessibleName })
    ).toBeInTheDocument();
  };
  const shouldDisplayValue = (expectedValue) => {
    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  };

  verify.shouldDisplayText = shouldDisplayText;
  verify.shouldDisplayValue = shouldDisplayValue;

  return verify;
};
export default verifyThat;
