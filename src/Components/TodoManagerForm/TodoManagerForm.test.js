import { waitFor } from "@testing-library/react";
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
import api from "../../lib/api";
import { renderWithProvider } from "../../test/utils/renderWithProvider";
import listTextBuilder from "../../test/builders/listTextBuilder";

describe("TodoManagerForm Component", () => {
  const user = {
    userId: "234",
    todoList: createDummyData(),
  };
  const db = fakeDb(); // an empty database
  const server = fakeServer(db);
  const cache = cacheBuilder().build(); // an empty cache
  const appAPI = api("/");

  beforeAll(() => server.listen());

  afterEach(() => {
    db.clear();
    server.resetHandlers();
    cache.clear();
  });

  afterAll(() => server.close());

  it("should create a new user and cache it", async () => {
    givenThatDB(db).willCreateUser(user.userId);

    const { getByRole } = renderWithProvider(
      <TodoManagerForm>
        {({ userId, todoList, loadingTodoList }) => {
          return (
            <FunForm>
              {() => {
                if (loadingTodoList === "pending") {
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
          );
        }}
      </TodoManagerForm>,
      { services: { api: appAPI, storage: cache } }
    );

    const list = await waitFor(() =>
      getByRole("list", { name: `Todo list of ${user.userId}` })
    );

    expect(list).not.toHaveTextContent();
    expect(JSON.parse(cache.getItem("userId"))).toEqual(user.userId);
  });

  it("should display the list of an existing cached user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const expectedListText = listTextBuilder()
      .title("")
      .items(user.todoList)
      .build();

    const { getByRole } = renderWithProvider(
      <TodoManagerForm>
        {({ todoList, loadingTodoList }) => (
          <FunForm>
            {() => {
              if (loadingTodoList) {
                return <div>Loading</div>;
              }
              return <TodoList initialList={todoList} />;
            }}
          </FunForm>
        )}
      </TodoManagerForm>,
      { services: { api: appAPI, storage: cache } }
    );

    const list = await waitFor(() => getByRole("list"));

    expect(list).toHaveTextContent(expectedListText);
  });
});
