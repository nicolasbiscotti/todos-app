import TodoList from "../ItemList/TodoList";

export default function ListContent({
  loadingTodoList,
  userId,
  initialList,
  onEditItem,
  onDeleteItem,
}) {
  if (loadingTodoList) {
    return <div className="grow">loading</div>;
  }
  if (initialList.length === 0) {
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
