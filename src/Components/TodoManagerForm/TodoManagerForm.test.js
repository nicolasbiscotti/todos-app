import { waitFor } from "@testing-library/react";
import cacheBuilder from "../../test/fake/cacheBuilder";
import { fakeDb } from "../../test/fake/fakeServer/db";
import { fakeServer } from "../../test/fake/fakeServer/server";
import { givenThatCache } from "../../test/givens/givenThatCache";
import { givenThatDB } from "../../test/givens/givenThatDB";
import { createDummyData } from "../../test/fake/fakeList";
import TodoManagerForm from "./TodoManagerForm";
import api from "../../lib/api";
import { renderWithProvider } from "../../test/utils/renderWithProvider";
import listTextBuilder from "../../test/builders/listTextBuilder";
import userEvent from "@testing-library/user-event";

describe("TodoManagerForm Component", () => {
  const user = {
    userId: "234-USER-007",
    todoList: createDummyData(),
  };
  const aTodo = {
    id: "tyu5-lkjg09HDE-89rt",
    title: "this is my title",
    message: "default message",
    completed: false,
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

    const { getByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

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

    const { getByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    const list = await waitFor(() => getByRole("list"));

    expect(list).toHaveTextContent(expectedListText);
  });

  it("should display the new todo when the title is valid", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatDB(db).willCreateTodo(aTodo.id);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const expectedListText = listTextBuilder()
      .title("")
      .items([...user.todoList, aTodo])
      .build();

    const { getByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    const uiUser = userEvent.setup();
    await uiUser.click(getByRole("textbox", { name: "input todo" }));
    await uiUser.keyboard(aTodo.title);
    await uiUser.click(getByRole("button", { name: "Agregar" }));

    const list = await waitFor(() => getByRole("list"));

    expect(list).toHaveTextContent(expectedListText);
    expect(db.getTodosForUser(user.userId)).toContainEqual(aTodo);
  });

  it("should change the todo completion status", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const { title, completed } = user.todoList[0];

    const { getByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    const uiUser = userEvent.setup();
    let checkbox = await waitFor(() => getByRole("checkbox", { name: title }));
    // const checkbox = within(testTodo).getByRole("checkbox");
    await uiUser.click(checkbox);

    checkbox = await waitFor(() => getByRole("checkbox", { name: title }));

    if (completed) {
      expect(checkbox).not.toBeChecked();
    } else {
      expect(checkbox).toBeChecked();
    }
    expect(db.getTodosForUser(user.userId)).toContainEqual({
      ...user.todoList[0],
      completed: !completed,
    });
  });
});
