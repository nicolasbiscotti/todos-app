import Checkbox from "./Checkbox";

export default function Todo({ todo }) {
  return (
    <li
      data-testid={todo.id}
      className="flex gap-2"
      onMouseOver={todo.setMouseOver}
      onMouseOut={todo.setMouseOut}
    >
      <label className="flex gap-2">
        <Checkbox checked={todo.completed} />
        <input
          type="checkbox"
          name="completed"
          checked={todo.completed}
          onChange={todo.editItem}
          className="hidden"
        />
        <span className="text-sm">{todo.title}</span>
      </label>

      {todo.mouseIsOver() && (
        <div className="grow text-right">
          <button type="button" onClick={todo.deleteItem}>
            delete
          </button>
        </div>
      )}
    </li>
  );
}
