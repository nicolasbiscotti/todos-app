import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ItemList from "./ItemList";
import Button from "../Button/Button";
import { faker } from "@faker-js/faker";
import { createDummyData } from "../../fake/fakeList";



describe("ItemList component", () => {
  
  const testList = createDummyData();
  const addItem = () => {};
  const editItem = () => {};
  const deleteItem = jest.fn(() => {});
  const listItems = () => {};
  const resetList = () => {};
  const filterItemsByCompleted = () => {};

  const renderList = (list) => {
    render(
      <ItemList initialList={list}>
        {({ items, handleMouseOver, handleMouseOut, mouseIsOverId }) => {
          const todoList = items.map((todo) => (
            <li
              key={todo.id}
              data-testid={mouseIsOverId === todo.id && "mouseover"}
              className="Item"
              onMouseOver={() => handleMouseOver(todo)}
              onMouseOut={handleMouseOut}
            >
              <label className="Item-title round">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => checkboxChange(todo)}
                />
                <span>{todo.title}</span>
              </label>

              {mouseIsOverId === todo.id && <Button>{() => "delete"}</Button>}
            </li>
          ));

          return <ul className="Item-list">{todoList}</ul>;
        }}
      </ItemList>
    );
  };

  it("should render no items", async () => {
    renderList([]);
    let itemList;
    await waitFor(() => (itemList = screen.getByRole("list")));
    expect(itemList).not.toHaveTextContent();
  });
  it("should render the correct number of items", async () => {
    renderList(testList);
    let items;
    await waitFor(() => (items = screen.getAllByRole("listitem")));
    expect(items).toHaveLength(testList.length);
  });
  it("should set mouseIsOverId with the id of the item that the mouse is over", async () => {
    renderList(testList);

    let items;
    await waitFor(() => (items = screen.getAllByRole("listitem")));

    const index = faker.datatype.number({ max: testList.length - 1 });
    const itemToTest = items[index];
    fireEvent.mouseOver(itemToTest);
    let itemsWithMousOver;
    await waitFor(
      () => (itemsWithMousOver = screen.getAllByTestId("mouseover"))
    );
    expect(itemsWithMousOver).toHaveLength(1);

    fireEvent.mouseOut(itemToTest);
    await waitFor(
      () => (itemsWithMousOver = screen.queryAllByTestId("mouseover"))
    );
    expect(itemsWithMousOver).toHaveLength(0);
  });
});
