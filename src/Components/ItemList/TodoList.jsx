import Button from "../Button/Button";
import ItemList from "./ItemList";

const TodoList = ({ initialList, onEditItem, onDeleteItem }) => (
  <ItemList {...{ initialList, onEditItem, onDeleteItem }}>
    {({ items, mouseOverId }) => {
      const todoList = items.map((todo) => (
        <li
          key={todo.id}
          data-testid={mouseOverId === todo.id && "mouseover"}
          className="Item"
          onMouseOver={todo.setMouseOver}
          onMouseOut={todo.setMouseOut}
        >
          <label className="Item-title round">
            <input
              type="checkbox"
              name="completed"
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
export default TodoList;
