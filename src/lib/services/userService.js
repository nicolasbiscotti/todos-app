import aUserRepository from "../api/userRepository";
import storeBuilder, { fetchUserId } from "./storeBuilder";

const configureUserService = () => {
  const config = {};

  const aStore = (store) => {
    const { baseURL } = config;
    const userRepository = aUserRepository(baseURL);
    return aUserService(userRepository, store);
  };

  const withUserRepoPointTo = (baseURL) => {
    config.baseURL = baseURL;
    return { aStore };
  };

  return { withUserRepoPointTo };
};

const aUserService = (userRepository, store) => {
  const listeners = [];
  const subscribe = (payload, cb) => listeners.push({ payload, cb });

  const publish = () =>
    listeners.forEach(({ payload, cb }) => {
      cb(store.getState().user[payload]);
      console.log("PUBLISH", store.getState().user[payload], store.getState().user.status)
    });

  store.subscribe(publish);

  const getCurrentUser = () => store.getState().user.userId;
  const getCurrentUserStatus = () => store.getState().user.status;

  const create = async () => {
    const userId = await store.dispatch(fetchUserId(userRepository)).unwrap();
    return userId;
  };

  const logFullState = () => console.log(store.getState());

  const service = {
    subscribe,
    getCurrentUser,
    getCurrentUserStatus,
    create,
    logFullState,
  };

  return service;
};
export default configureUserService;
