const aTodoRepository = (baseURL) => {
  const list = async (userId) => {
    const request = new Request(`${baseURL}/todo/${userId}`);
    const response = await fetch(request);
    return await response.json();
  };

  const repository = { list };

  return repository;
};

export default aTodoRepository;
