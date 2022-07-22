import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ItemList from "./ItemList";
import Button from "../Button/Button";
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
              data-testid={todo.id}
              className="Item"
              onMouseOver={() => handleMouseOver(todo)}
              onMouseOut={handleMouseOut}
            >
              {mouseIsOverId === todo.id && <div>mouseover</div>}
              <label className="Item-title round">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleEdit(todo)}
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
    renderList(testList); // given that ItemList will be rendered
    const toMouseOverId = testList[0].id; // given that itemToTest will be mouseOvered
    let items;
    let itemToTest;
    await waitFor(() => {
      items = screen.getAllByRole("listitem");
      itemToTest = screen.getByTestId(toMouseOverId);
    });
    fireEvent.mouseOver(itemToTest); // expected result -> one element with text "mouseover"

    let itemsWithMousOver; // get actual result
    await waitFor(() => (itemsWithMousOver = screen.queryAllByText("mouseover")));
    expect(itemsWithMousOver).toHaveLength(1);

    fireEvent.mouseOut(itemToTest); // given that itemToTest will be mouseOuted // expected result -> no elements with text "mouseover"

    await waitFor(
      // get actual result
      () => (itemsWithMousOver = screen.queryAllByText("mouseover"))
    );
    expect(itemsWithMousOver).toHaveLength(0);
  });

  // it("should call the handleEdit with the item as argument", () => {
  //   // given that ItemList will be rendered
  //   renderList(testList);
  //   // given that unchecked itemToTest will be checked
  //   let itemToTest;
  //   await waitFor(() => (itemToTest = screen.getAllByRole("checkbox")));
  //   fireEvent.mouseOver(itemToTest);
  //   // expected result
  // })
});
