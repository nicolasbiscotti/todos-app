const verifyThatAction = (thunk) => {
  const config = {};
  const shouldChangeTheStateTo = async (expectedState) => {
    const { store, arg } = config;
    await store.dispatch(thunk(arg));
    const state = store.getState();
    expect(state).toEqual(expectedState);
  };

  const dispatchedOn = (store) => {
    config.store = store;
    return { shouldChangeTheStateTo };
  };
  const withArgument = (arg) => {
    config.arg = arg;
    return { dispatchedOn };
  };

  return { withArgument };
};

export default verifyThatAction;
