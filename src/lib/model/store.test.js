import cacheBuilder from "../../test/fake/cacheBuilder";
import { createDummyData } from "../../test/fake/fakeList";
import { fakeDb } from "../../test/fake/fakeServer/db";
import { fakeServer } from "../../test/fake/fakeServer/server";
import { givenThatCache } from "../../test/givens/givenThatCache";
import { givenThatDB } from "../../test/givens/givenThatDB";
import verifyThatAction from "../../test/verifies/verifyThatAction";
import storeBuilder, {
  fetchTodoList,
  filterByCompletion,
  resetTodoList,
} from "./store";

describe("Store service", () => {
  const user = { userId: "456-hjkñ-7890fhjkl", todoList: [], status: "idle" };
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

  it("should create a user and store it in the cache when starts with an empty cache", async () => {
    givenThatDB(db).willCreateUser(user.userId);
    
    const store = await storeBuilder().cache(cache).build();

    const initialState = store.getState();
    const cachedUserId = JSON.parse(cache.getItem("userId"));

    expect(initialState).toEqual(user);
    expect(cachedUserId).toEqual(user.userId);
  });

  it("should hydrate the initial state with the todoList of the user in cache", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(aTodoList);
    
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);
  
    const store = await storeBuilder().cache(cache).build();

    const expectedInitialState = { ...user, todoList: aTodoList };

    const initialState = store.getState();

    expect(initialState).toEqual(expectedInitialState);
  });

  it("should reset the todoList of the user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(aTodoList);
    
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const store = await storeBuilder().cache(cache).build();
    const userId = store.getState().userId;

    const expectedState = {
      ...user,
      todoList: [],
    };
    await verifyThatAction(resetTodoList)
      .withArgument(userId)
      .dispatchedOn(store)
      .shouldChangeTheStateTo(expectedState);
  });

  it("should filter the todoList of the user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(aTodoList);

    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const store = await storeBuilder().cache(cache).build();
    const userId = store.getState().userId;

    const stateWithCompletedTodos = {
      ...user,
      todoList: aTodoList.filter((todo) => todo.completed),
    };

    const stateWithUncompletedTodos = {
      ...user,
      todoList: aTodoList.filter((todo) => !todo.completed),
    };

    const stateWithAllTodos = {
      ...user,
      todoList: aTodoList,
    };

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
      .dispatchedOn(store)
      .shouldChangeTheStateTo(stateWithCompletedTodos);

    await verifyThatAction(filterByCompletion)
      .withArgument(uncompletedTodosForUser)
      .dispatchedOn(store)
      .shouldChangeTheStateTo(stateWithUncompletedTodos);

    await verifyThatAction(fetchTodoList)
      .withArgument(userId)
      .dispatchedOn(store)
      .shouldChangeTheStateTo(stateWithAllTodos);
  });
});
