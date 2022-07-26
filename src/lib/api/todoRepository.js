const aTodoRepository = (baseURL) => {
  const repository = {};

  const list = async (userId) => {
    const request = new Request(`${baseURL}/todo/${userId}`);
    const response = await fetch(request);
    return await response.json();
  };

  repository.list = list;

  return repository;
};

export default aTodoRepository;
