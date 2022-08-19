import { useAppSelector } from "../../lib/model/hooks";
import { selectFiltersApplied } from "../../lib/model/reducers/filters";
import TodoList from "../ItemList/TodoList";

export default function ListContent({
  loadingTodoList,
  userId,
  initialList,
  onEditItem,
  onDeleteItem,
}) {
  const filtersApplied = useAppSelector(selectFiltersApplied);

  if (loadingTodoList) {
    return <div className="grow">loading todo list</div>;
  }
  if (initialList.length === 0 && !filtersApplied) {
    return (
      <div className="grow">
        <ul
          className="flex flex-col gap-2 pt-4"
          aria-label={`Todo list of ${userId}`}
        ></ul>
      </div>
    );
  }
  return (
    <div className="grow">
      <TodoList
        userId={userId}
        initialList={initialList}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
}
