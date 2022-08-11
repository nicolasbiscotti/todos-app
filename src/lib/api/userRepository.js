const userRepository = (baseURL) => {
  const createUser = async () => {
    const request = new Request(`${baseURL}/userId`);
    const response = await fetch(request);
    const userId = await response.text();
    return userId;
  };

  const user = { createUser };

  return user;
};

export default userRepository;
