import { render } from "@testing-library/react";
import Button from "../../Components/Button/Button";
import ItemList from "../../Components/ItemList/ItemList";

function givenThat(itemList) {
  const that = {};

  const alreadyHas = (item) => {
    itemList.push(item);
    return that;
  };
  const willBeRendered = () => {
    render(
      <ItemList initialList={itemList}>
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

              {mouseOverId === todo.id && <Button>{() => "delete"}</Button>}
            </li>
          ));

          return <ul className="Item-list">{todoList}</ul>;
        }}
      </ItemList>
    );
  };

  that.alreadyHas = alreadyHas;
  that.willBeRendered = willBeRendered;

  return that;
}

export default givenThat;
