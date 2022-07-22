import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import ItemList from "./ItemList";
import Button from "../Button/Button";
import { createDummyData } from "../../test/fake/fakeList";
import givenThatList from "../../test/givens/givenThatList";

describe("ItemList component", () => {
  const testItem = {
    id: "702b75de-9683-4a71-a2a2-547f25cf47a1",
    title: "cambiar las cortinas",
    message: "este es un msg",
    completed: false,
  };
  let testList;
  const addItem = () => {};
  const editItem = jest.fn();
  const deleteItem = jest.fn();
  const listItems = () => {};
  const resetList = () => {};
  const filterItemsByCompleted = () => {};

  const renderList = (list) => {
    render(
      <ItemList
        initialList={list}
        onEditItem={editItem}
        onDeleteItem={deleteItem}
      >
        {({ items, mouseOverId }) => {
          const todoList = items.map((todo) => (
            <li
              key={todo.id}
              data-testid={todo.id}
              className="Item"
              onMouseOver={todo.setMouseOver}
              onMouseOut={todo.setMouseOut}
            >
              {mouseOverId === todo.id && <div>mouseover</div>}
              <label className="Item-title round">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={todo.editItem}
                />
                <span>{todo.title}</span>
              </label>

              {mouseOverId === todo.id && (
                <Button attributes={{ onClick: todo.deleteItem }}>
                  {() => "delete"}
                </Button>
              )}
            </li>
          ));

          return <ul className="Item-list">{todoList}</ul>;
        }}
      </ItemList>
    );
  };
  beforeEach(() => {
    testList = createDummyData();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render no items", () => {
    renderList([]);
    let itemList = screen.getByRole("list");
    expect(itemList).not.toHaveTextContent();
  });

  it("should render the correct number of items", () => {
    renderList(testList);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(testList.length);
  });

  it("should set mouseOverId with the id of the item that the mouse is over", () => {
    givenThatList(testList).alreadyHas(testItem).willBeRendered();
    const itemElement = screen.getByTestId(testItem.id);
    fireEvent.mouseOver(itemElement); // expected result -> one element with text "mouseover"

    // get actual result
    let itemsWithMousOver = screen.queryAllByText("mouseover");
    expect(itemsWithMousOver).toHaveLength(1);

    // given that itemElement will be mouseOuted
    fireEvent.mouseOut(itemElement);
    // expected result -> no elements with text "mouseover"
    itemsWithMousOver = screen.queryAllByText("mouseover");
    expect(itemsWithMousOver).toHaveLength(0);
  });

  it("should call the editItem with the item as argument", () => {
    // given that ItemList will be rendered
    testList.push(testItem);
    renderList(testList);
    // given that an event call item.editItem
    const checkbox = within(screen.getByTestId(testItem.id)).getByRole(
      "checkbox"
    );
    fireEvent.click(checkbox);
    expect(editItem).toHaveBeenCalledTimes(1);
    expect(editItem).toHaveBeenCalledWith(testItem);
  });

  it("should call the deleteItem with the item as argument", () => {
    // given that ItemList will be rendered
    testList.push(testItem);
    renderList(testList);
    // given that an event call item.deleteItem
    const itemElement = screen.getByTestId(testItem.id);
    fireEvent.mouseOver(itemElement);
    const deleteButton = within(itemElement).getByRole("button");
    fireEvent.click(deleteButton);
    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledWith(testItem);
  });
});
