import { render } from "@testing-library/react";

const givenThat = (jsxComponent) => {
  const given = {};
  const willBeRendered = () => {
    return {
      ...render(jsxComponent),
    };
  };
  given.willBeRendered = willBeRendered;
  return given;
};
export default givenThat;
