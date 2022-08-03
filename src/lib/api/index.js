import todoRepository from "./todoRepository";
import userRepository from "./userRepository";

export default (baseURL) => {
  const lastCharacter = baseURL.length - 1;
  if (baseURL[lastCharacter] === "/") {
    baseURL = baseURL.slice(0, lastCharacter);
  }
  
  const user = userRepository(baseURL);
  const todos = todoRepository(baseURL);

  return { user, todos };
};
