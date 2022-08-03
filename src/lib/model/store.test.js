import cacheBuilder from "../../test/fake/cacheBuilder";
import { createDummyData } from "../../test/fake/fakeList";
import { fakeDb } from "../../test/fake/fakeServer/db";
import { fakeServer } from "../../test/fake/fakeServer/server";
import { givenThatCache } from "../../test/givens/givenThatCache";
import { givenThatDB } from "../../test/givens/givenThatDB";
import verifyThatAction from "../../test/verifies/verifyThatAction";
import api from "../api";
import store from "./store";
import { userBuilder } from "./userBuilder";

describe("Store service", () => {
  const user = userBuilder.userId("456-hjkñ-7890fhjkl").build();
  const aTodoList = createDummyData();
  const db = fakeDb(); // an empty database
  const server = fakeServer(db);
  const cache = cacheBuilder().build(); // an empty cache

  beforeAll(() => server.listen());

  afterEach(() => {
    db.clear();
    server.resetHandlers();
    cache.clear();
  });

  afterAll(() => server.close());

  it("should create a user and store it in the cache", async () => {
    givenThatDB(db).willCreateUser(user.userId);

    const {
      store: theStore,
      actions: { setUser },
    } = store({
      storage: cache,
      api: api("/"),
    });

    await theStore.dispatch(setUser());

    const state = theStore.getState();
    const cachedUserId = JSON.parse(cache.getItem("userId"));

    expect(state).toEqual({ ...user, setUserLoading: "fulfilled" });
    expect(cachedUserId).toEqual(user.userId);
  });

  it("should set the todoList of the user in cache", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(aTodoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const {
      store: theStore,
      actions: { setUser, getTodosForUser },
    } = store({
      storage: cache,
      api: api("/"),
    });

    const expectedState = {
      ...user,
      setUserLoading: "fulfilled",
      todoList: aTodoList,
      todoListLoading: "fulfilled",
    };

    await theStore.dispatch(setUser());
    await theStore.dispatch(getTodosForUser(theStore.getState().userId));

    const state = theStore.getState();

    expect(state).toEqual(expectedState);
  });

  it("should reset the todoList of the user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(aTodoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const { store: theStore, actions } = store({
      storage: cache,
      api: api("/"),
    });
    await theStore.dispatch(actions.setUser());
    const userId = theStore.getState().userId;

    const expectedState = userBuilder
      .of(user)
      .setUserLoading("fulfilled")
      .todoListLoading("fulfilled")
      .build();

    await verifyThatAction(actions.resetTodoList)
      .withArgument(userId)
      .dispatchedOn(theStore)
      .shouldChangeTheStateTo(expectedState);
  });

  it("should filter the todoList of the user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(aTodoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const {
      store: theStore,
      actions: { setUser, getTodosForUser, filterByCompletion },
    } = store({
      storage: cache,
      api: api("/"),
    });
    await theStore.dispatch(setUser());
    const userId = theStore.getState().userId;

    const stateWithCompletedTodos = {
      ...user,
      todoList: aTodoList.filter((todo) => todo.completed),
      setUserLoading: "fulfilled",
      todoListLoading: "fulfilled",
    };

    const stateWithUncompletedTodos = {
      ...user,
      todoList: aTodoList.filter((todo) => !todo.completed),
      setUserLoading: "fulfilled",
      todoListLoading: "fulfilled",
    };

    const stateWithAllTodos = userBuilder
      .userId(user.userId)
      .todoList(aTodoList)
      .setUserLoading("fulfilled")
      .todoListLoading("fulfilled")
      .build();

    const completedTodosForUser = {
      userId,
      completed: true,
    };
    const uncompletedTodosForUser = {
      userId,
      completed: false,
    };

    await verifyThatAction(filterByCompletion)
      .withArgument(completedTodosForUser)
      .dispatchedOn(theStore)
      .shouldChangeTheStateTo(stateWithCompletedTodos);

    await verifyThatAction(filterByCompletion)
      .withArgument(uncompletedTodosForUser)
      .dispatchedOn(theStore)
      .shouldChangeTheStateTo(stateWithUncompletedTodos);

    await verifyThatAction(getTodosForUser)
      .withArgument(userId)
      .dispatchedOn(theStore)
      .shouldChangeTheStateTo(stateWithAllTodos);
  });
});
