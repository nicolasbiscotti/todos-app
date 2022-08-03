const todoRepository = (baseURL) => {
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

  const filterByCompletion = async ({ userId, completed }) => {
    const response = await fetch(`${baseURL}/todo/${userId}/${completed}`);
    const filteredList = await response.json();
    return filteredList;
  };

  const todos = { list, resetList, filterByCompletion };

  return todos;
};

export default todoRepository;
