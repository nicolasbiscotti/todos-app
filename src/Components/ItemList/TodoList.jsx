import Button from "../Button/Button";
import ItemList from "./ItemList";

const TodoList = ({ userId, initialList, onEditItem, onDeleteItem }) => (
  <ItemList {...{ initialList, onEditItem, onDeleteItem }}>
    {({ items, mouseOverId }) => {
      const todoList = items.map((todo) => (
        <li
          key={todo.id}
          data-testid={todo.id}
          className="flex gap-2"
          onMouseOver={todo.setMouseOver}
          onMouseOut={todo.setMouseOut}
        >
          <label className="flex gap-2">
            <svg
              className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              {todo.completed && (
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              )}
            </svg>
            <input
              type="checkbox"
              name="completed"
              checked={todo.completed}
              onChange={todo.editItem}
              className="hidden"
            />
            <span className="text-sm">{todo.title}</span>
          </label>

          {mouseOverId === todo.id && (
            <div className="grow text-right">
              <button type="button" onClick={todo.deleteItem}>
                delete
              </button>
            </div>
          )}
        </li>
      ));

      if (items.length > 0) {
        return (
          <div className="flex flex-col gap-3 bg-white px-4 py-4 rounded-xl divide-y-2">
            <div className="flex gap-3">
              <h4>To-dos list</h4>
              <svg
                className="h-6 w-6 flex-none fill-black stroke-white stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" fill="none" />
                <line x1="8" y1="12" x2="16" y2="12" fill="none" />
              </svg>
              <div className="grow text-right">
                <select name="" id="" className="bg-white text-right">
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="not completed">Not completed</option>
                </select>
              </div>
            </div>
            <ul
              className="flex flex-col gap-2 pt-4"
              aria-label={`Todo list of ${userId}`}
            >
              {todoList}
            </ul>
          </div>
        );
      }
      return <ul aria-label={`Todo list of ${userId}`}></ul>;
    }}
  </ItemList>
);
export default TodoList;
