export default function Header({ loadingUser, todoList }) {
  if (loadingUser) {
    return <div>loading user</div>;
  }
  if (todoList.length === 0) {
    return (
      <>
        <h1 className="text-2xl font-bold py-2 pl-3 border-l-8 border-amber-200">
          To-dos list
        </h1>
        <h4 className="border-l-8 mt-2 pl-3">
          There is still nothing to be done.
        </h4>
      </>
    );
  }
  return;
}
