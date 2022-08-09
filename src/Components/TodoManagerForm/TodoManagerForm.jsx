import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/model/hooks";
import {
  createTodoForUser,
  selectTodoList,
} from "../../lib/model/reducers/todos";
import { selectLoadingTodoList } from "../../lib/model/reducers/ui";
import { getUser, selectUserId } from "../../lib/model/reducers/user";
import FunForm from "../FunForm/FunForm";
import TodoList from "../ItemList/TodoList";

const TodoManagerForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const todoList = useAppSelector(selectTodoList);
  const loadingTodoList = useAppSelector(selectLoadingTodoList);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const createTodo = useCallback((payload) =>
    dispatch(createTodoForUser(payload))
  );

  return (
    <FunForm initialValues={{ title: "" }} onSubmit={createTodo}>
      {({ values, handleChange, handleSubmit }) => {
        return (
          <form>
            <label>
              {"input todo"}
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              ></input>
            </label>
            {loadingTodoList ? (
              <div>loading</div>
            ) : (
              <TodoList userId={userId} initialList={todoList} />
            )}
            <button onClick={handleSubmit}>Agregar</button>
          </form>
        );
      }}
    </FunForm>
  );
};
export default TodoManagerForm;
