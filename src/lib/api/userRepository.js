const aUserRepository = (baseURL) => {
  const createUser = async () => {
    const request = new Request(`${baseURL}/userId`);
    const response = await fetch(request);
    const userId = await response.json();
    return userId;
  };

  const list = async (userId) => {
    const request = new Request(`${baseURL}/todo/${userId}`);
    const response = await fetch(request);
    return await response.json();
  };

  const resetList = async (userId) => {
    const request = new Request(`${baseURL}/todo/${userId}/reset`, {
      method: "DELETE",
    });
    const response = await fetch(request);
    const todoList = await response.json();
    return todoList;
  };

  const filterByCompletion = async ({userId, completed}) => {
    const response = await fetch(`${baseURL}/todo/${userId}/${completed}`);
    const filteredList = await response.json();
    return filteredList;
  }

  const user = { createUser };
  const todos = { list, resetList, filterByCompletion };

  return { user, todos };
};

export default aUserRepository;
