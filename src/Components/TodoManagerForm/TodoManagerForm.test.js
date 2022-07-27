import { render, waitFor } from "@testing-library/react";
import listAccessibleName from "../../test/builders/listAccessibleName";
import cacheBuilder from "../../test/fake/cacheBuilder";
import { fakeDb } from "../../test/fake/fakeServer/db";
import { fakeServer } from "../../test/fake/fakeServer/server";
import { givenThatCache } from "../../test/givens/givenThatCache";
import { givenThatDB } from "../../test/givens/givenThatDB";
import { createDummyData } from "../../test/fake/fakeList";
import configureTodoService from "../../lib/services/todoService";
import TodoManagerForm from "./TodoManagerForm";
import FunForm from "../FunForm/FunForm";
import TodoList from "../ItemList/TodoList";

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

  it("should display the list of an existing cached user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const todoService = configureTodoService()
      .withTodoRepoPointTo("")
      .aStoreInitializedWith(cache);

    const expectedAccessibleName = listAccessibleName()
      .title("")
      .items(user.todoList)
      .build();

    const { getByRole } = render(
      <TodoManagerForm todoService={todoService}>
        {({ todoList, todoListStatus }) => (
          <FunForm>
            {() => {
              todoService.logFullState();
              if (todoListStatus === "pending") {
                return <div>Loading</div>;
              }
              return <TodoList initialList={todoList} />;
            }}
          </FunForm>
        )}
      </TodoManagerForm>
    );

    const list = await waitFor(() => getByRole("list"));

    expect(list).toHaveTextContent(expectedAccessibleName);
  });

  xit("should fetch a new userId and cache it", async () => {
    givenThatDB(db).willCreateUser(user.userId);

    const todoService = configureTodoService()
      .withTodoRepoPointTo("")
      .aStoreInitializedWith(cache);

    const { getByRole } = render(
      <TodoManagerForm todoService={todoService}>
        {({ todoList, todoListStatus }) => (
          <FunForm>
            {() => {
              todoService.logFullState();
              if (todoListStatus === "pending") {
                return <div>Loading</div>;
              }
              return <TodoList initialList={todoList} />;
            }}
          </FunForm>
        )}
      </TodoManagerForm>
    );

    const list = await waitFor(() =>
      getByRole("list", { name: `Todo list of ${user.userId}` })
    );
  });
});
