const verifyThatAction = (thunk) => {
  const config = {};
  const shouldChangeTheStateTo = async (expectedState) => {
    const { store, payload } = config;
    await store.dispatch(thunk(payload));
    const state = store.getState();
    expect(state).toEqual(expectedState);
  };

  const dispatchedOn = (store) => {
    config.store = store;
    return { shouldChangeTheStateTo };
  };
  const withPayload = (payload) => {
    config.payload = payload;
    return { dispatchedOn };
  };

  return { withPayload };
};

export default verifyThatAction;
