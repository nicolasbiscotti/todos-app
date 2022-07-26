import { render, waitFor } from "@testing-library/react";
import aTodoRepository from "../../lib/api/todoRepository";
import storeBuilder from "../../lib/services/storeBuilder";
import aTodoService from "../../lib/services/todoService";
import listAccessibleName from "../../test/builders/listAccessibleName";
import cacheBuilder from "../../test/fake/cacheBuilder";
import { fakeDb } from "../../test/fake/fakeServer/db";
import { fakeServer } from "../../test/fake/fakeServer/server";
import { givenThatCache } from "../../test/givens/givenThatCache";
import { givenThatDB } from "../../test/givens/givenThatDB";
import TodoManagerForm from "./TodoManagerForm";
import userEvent from "@testing-library/user-event";
import { createDummyData } from "../../test/fake/fakeList";

describe("TodoManagerForm Component", () => {
  const user = {
    userId: "234",
    todoList: createDummyData(),
  };
  const db = fakeDb();
  const cache = cacheBuilder().build();
  const server = fakeServer(db);

  beforeAll(() => server.listen());

  afterEach(() => {
    db.clear();
    cache.clear();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it("should display the list of an existing cached user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const expectedAccessibleName = listAccessibleName()
      .title("")
      .items(user.todoList)
      .build();

    const store = storeBuilder(cache).build();
    const todoRepository = aTodoRepository("");
    const todoService = aTodoService(todoRepository, store);

    const { getByRole } = render(
      <TodoManagerForm todoService={todoService} store={store} />
    );

    const list = await waitFor(() => getByRole("list"));

    expect(list).toHaveTextContent(expectedAccessibleName);
  });
});
