import Button from "../Button/Button";
import ItemList from "./ItemList";

const TodoList = ({ initialList }) => (
  <ItemList initialList={initialList}>
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
export default TodoList;
