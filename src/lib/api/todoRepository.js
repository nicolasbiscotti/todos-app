const todoRepository = (baseURL) => {
  const list = async (userId) => {
    const request = new Request(`${baseURL}/todo/${userId}`);
    const response = await fetch(request);
    return await response.json();
  };

  const resetList = async ({userId}) => {
    const request = new Request(`${baseURL}/todo/${userId}/reset`, {
      method: "DELETE",
    });
    const response = await fetch(request);
    const result = await response.json();
    return result;
  };

  const filterByCompletion = async ({ userId, completed }) => {
    const response = await fetch(`${baseURL}/todo/${userId}/${completed}`);
    const filteredList = await response.json();
    return filteredList;
  };

  const addItem = async ({ userId, title, message }) => {
    const request = new Request(`${baseURL}/todo/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message }),
    });
    const response = await fetch(request);
    const todo = await response.json();
    return todo;
  };

  const editItem = async ({ userId, todoId, completed }) => {
    const request = new Request(`${baseURL}/todo/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed, todoId }),
    });
    try {
      const response = await fetch(request);
      const editedTodo = await response.json();
      return { todoId, completed: editedTodo.completed };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async ({ userId, todoId }) => {
    const request = new Request(`${baseURL}/todo/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId }),
    });
    try {
      const response = await fetch(request);
      const deleteStatus = await response.json();
      return {...deleteStatus, todoId};
    } catch (error) {
      console.log(error);
    }
  };

  const todos = {
    list,
    resetList,
    filterByCompletion,
    addItem,
    editItem,
    deleteItem,
  };

  return todos;
};

export default todoRepository;
