import { render, waitFor } from "@testing-library/react";
import listAccessibleName from "../../test/builders/listAccessibleName";
import cacheBuilder from "../../test/fake/cacheBuilder";
import { fakeDb } from "../../test/fake/fakeServer/db";
import { fakeServer } from "../../test/fake/fakeServer/server";
import { givenThatCache } from "../../test/givens/givenThatCache";
import { givenThatDB } from "../../test/givens/givenThatDB";
import { createDummyData } from "../../test/fake/fakeList";
import TodoManagerForm from "./TodoManagerForm";
import FunForm from "../FunForm/FunForm";
import TodoList from "../ItemList/TodoList";
import ItemList from "../ItemList/ItemList";
import storeBuilder from "../../lib/model/store";
import { Provider } from "react-redux";

describe("TodoManagerForm Component", () => {
  const user = {
    userId: "234",
    todoList: createDummyData(),
  };
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

  xit("should display the list of an existing cached user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const store = await storeBuilder().cache(cache).build();

    const expectedAccessibleName = listAccessibleName()
      .title("")
      .items(user.todoList)
      .build();

    const { getByRole } = render(
      <Provider store={store}>
        <TodoManagerForm>
          {({ todoList, todoListStatus }) => (
            <FunForm>
              {() => {
                if (todoListStatus === "pending") {
                  return <div>Loading</div>;
                }
                return <TodoList initialList={todoList} />;
              }}
            </FunForm>
          )}
        </TodoManagerForm>
      </Provider>
    );

    const list = await waitFor(() => getByRole("list"));

    expect(list).toHaveTextContent(expectedAccessibleName);
  });

  xit("should fetch a new userId and cache it", async () => {
    givenThatDB(db).willCreateUser(user.userId);

    const store = await storeBuilder().cache(cache).build();

    const { getByRole } = render(
      <Provider store={store}>
        {" "}
        <TodoManagerForm>
          {({ userId, todoList, todoListStatus }) => (
            <FunForm>
              {() => {
                if (todoListStatus === "pending") {
                  return <div>Loading</div>;
                }
                return (
                  <ItemList initialList={todoList}>
                    {({ items }) => (
                      <ul aria-label={`Todo list of ${userId}`}>
                        {items.map((item) => (
                          <li>{item.title}</li>
                        ))}
                      </ul>
                    )}
                  </ItemList>
                );
              }}
            </FunForm>
          )}
        </TodoManagerForm>
      </Provider>
    );

    const list = await waitFor(() =>
      getByRole("list", { name: `Todo list of ${user.userId}` })
    );

    expect(list).not.toHaveTextContent();
    expect(JSON.parse(cache.getItem("userId"))).toEqual(user.userId);
  });
});
