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

    const heading = await waitFor(() =>
      getByRole("heading", { name: `To-dos list` })
    );

    expect(heading).toBeInTheDocument();
    expect(JSON.parse(cache.getItem("userId"))).toEqual(user.userId);
  });

  it("should display the list of an existing cached user", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const expectedListText = listTextBuilder()
      .title("")
      .items(user.todoList)
      .build();

    const { getByRole, queryByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    const list = await waitFor(() => getByRole("list"));
    const heading = queryByRole("heading", {
      name: `There is still nothing to be done.`,
    });

    expect(heading).not.toBeInTheDocument();
    expect(list.textContent).toEqual(expectedListText);
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

    const finalUser = userEvent.setup();
    await finalUser.click(
      getByRole("textbox", { name: "Add a pending task..." })
    );
    await finalUser.keyboard(aTodo.title);
    await finalUser.click(getByRole("button", { name: "Agregar" }));

    const list = await waitFor(() => getByRole("list"));

    expect(list.textContent).toEqual(expectedListText);
    expect(db.getTodosForUser(user.userId)).toContainEqual(aTodo);
  });

  it("should change the todo completion status", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const { title, completed } = user.todoList[0];

    const finalUser = userEvent.setup();
    const { getByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    let checkbox = await waitFor(() => getByRole("checkbox", { name: title }));
    await finalUser.click(checkbox);
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

  it("should delete a todo", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const { title, id } = user.todoList[0];

    const expectedTodoList = user.todoList.filter((todo) => todo.id !== id);

    const finalUser = userEvent.setup();
    const { getByRole, getByTestId } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });
    let listItem = await waitFor(() => getByTestId(id));
    await finalUser.hover(listItem);
    await finalUser.click(getByRole("button", { name: "delete" }));

    const list = await waitFor(() => getByRole("list"));

    expect(list).not.toHaveTextContent(title);
    expect(db.getTodosForUser(user.userId)).toEqual(expectedTodoList);
  });

  it("should clear the todo list", async () => {
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(user.todoList);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const finalUser = userEvent.setup();
    const { getByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    const clearButton = await waitFor(() =>
      getByRole("button", { name: "clear todo list" })
    );
    await finalUser.click(clearButton);

    await finalUser.click(getByRole("button", { name: "Reset list" }));

    const heading = await waitFor(() =>
      getByRole("heading", { name: `There is still nothing to be done.` })
    );

    expect(heading).toBeInTheDocument();
    expect(getByRole("list")).not.toHaveTextContent();
    expect(db.getTodosForUser(user.userId)).toHaveLength(0);
  });

  it("should filter by completion", async () => {
    const allNotCompleted = user.todoList.map((todo) => ({
      ...todo,
      completed: false,
    }));
    givenThatDB(db).alreadyHasUserId(user.userId).withTodoList(allNotCompleted);
    givenThatCache(cache).alreadyHasItem("userId").withValue(user.userId);

    const finalUser = userEvent.setup();
    const { getByRole, queryByRole } = renderWithProvider(<TodoManagerForm />, {
      services: { api: appAPI, storage: cache },
    });

    const filterButton = await waitFor(() =>
      getByRole("button", { name: "Filter by" })
    );

    const completedList = allNotCompleted.filter((todo) => todo.completed);
    const expectedCompleteList = listTextBuilder().items(completedList).build();

    const incompletedList = allNotCompleted.filter((todo) => !todo.completed);
    const expectedIncompleteList = listTextBuilder()
      .items(incompletedList)
      .build();

    await finalUser.click(filterButton);
    await finalUser.click(getByRole("option", { name: "Completed" }));

    const completedTodos = await waitFor(() => getByRole("list"));
    expect(completedTodos.textContent).toEqual(expectedCompleteList);
    expect(
      queryByRole("heading", { name: "There is still nothing to be done." })
    ).not.toBeInTheDocument();

    await finalUser.click(filterButton);
    await finalUser.click(getByRole("option", { name: "Not completed" }));

    let incompleteTodos = await waitFor(() => getByRole("list"));
    expect(incompleteTodos.textContent).toEqual(expectedIncompleteList);

    const anInclompleteTodo = allNotCompleted[0].title;
    await finalUser.click(getByRole("checkbox", { name: anInclompleteTodo }));

    incompleteTodos = await waitFor(() => getByRole("list"));
    expect(incompleteTodos).not.toHaveTextContent(anInclompleteTodo);

    // if clear the todo list after apply filters, it should go away
    await finalUser.click(getByRole("button", { name: "clear todo list" }));
    await finalUser.click(getByRole("button", { name: "Reset list" }));
    await waitFor(() => getByRole("list"));
    expect(
      queryByRole("button", { name: "Filter by" })
    ).not.toBeInTheDocument();
  });
});
