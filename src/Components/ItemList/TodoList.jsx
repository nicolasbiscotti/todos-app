import ItemList from "./ItemList";
import Todo from "./Todo";
import Toolbar from "./Toolbar";

const TodoList = ({ userId, initialList, onEditItem, onDeleteItem, onResetList }) => (
  <ItemList {...{ initialList, onEditItem, onDeleteItem }}>
    {({ items, mouseOverId }) => {
      const todoList = items.map((todo) => <Todo key={todo.id} todo={todo} />);

      return (
        <div className="flex flex-col gap-3 bg-white px-4 py-4 rounded-xl divide-y-2">
          <Toolbar resetList={onResetList} />
          <ul
            className="flex flex-col gap-2 pt-4"
            aria-label={`Todo list of ${userId}`}
          >
            {todoList}
          </ul>
        </div>
      );
    }}
  </ItemList>
);
export default TodoList;
