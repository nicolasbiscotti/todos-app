import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const verifyThatFunction = (fn) => {
  const privateConfig = {
    events: ["click"],
    roleAndAccessibleName: { role: "button", accessibleName: "test button" },
    times: 0,
  };
  const verify = {};

  const afterUserClickedOn = ({ role, accessibleName }) => {
    privateConfig.roleAndAccessibleName = { role, accessibleName };
    return verify;
  };

  const shouldBeCalledTimes = (times) => {
    privateConfig.times = times;
    return verify;
  };

  const withArguments = async (...args) => {
    const { role, accessibleName } = privateConfig.roleAndAccessibleName;
    const { times } = privateConfig;
    const user = userEvent.setup();
    await user.click(screen.getByRole(role, { name: accessibleName }));
    expect(fn).toHaveBeenCalledTimes(times);
    expect(fn).toHaveBeenCalledWith(...args);
  };

  verify.afterUserClickedOn = afterUserClickedOn;
  verify.shouldBeCalledTimes = shouldBeCalledTimes;
  verify.withArguments = withArguments;

  return verify;
};
export default verifyThatFunction;
