const aUserRepository = (baseURL) => {
  const createUser = async () => {
    const request = new Request(`${baseURL}/userId`);
    const response = await fetch(request);
    return await response.json();
  };

  const repository = { createUser };

  return repository;
};

export default aUserRepository;
