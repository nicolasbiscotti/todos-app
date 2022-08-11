import logo from "../../logo.svg";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/model/hooks";
import {
  createTodoForUser,
  deleteTodoForUser,
  editTodoForUser,
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

  const editTodo = useCallback((payload) => dispatch(editTodoForUser(payload)));

  const deleteTodo = useCallback((payload) =>
    dispatch(deleteTodoForUser(payload))
  );

  return (
    <FunForm initialValues={{ title: "" }} onSubmit={createTodo}>
      {({ values, handleChange, handleSubmit }) => {
        return (
          <form className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </div>

            <div className="App-intro">
              <h2>Todo list</h2>
              <h4>¿Qué cosa tenés que terminar hoy?</h4>
            </div>

            <div className="App-input-todo-title">
              <label>
                {"input todo"}
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                ></input>
              </label>
            </div>

            <div className="App-todo-list">
              {loadingTodoList ? (
                <div>loading</div>
              ) : (
                <TodoList
                  userId={userId}
                  initialList={todoList}
                  onEditItem={editTodo}
                  onDeleteItem={deleteTodo}
                />
              )}
            </div>

            <div className="App-add-button">
              <button className="add-big" onClick={handleSubmit}>
                Agregar
              </button>
            </div>
          </form>
        );
      }}
    </FunForm>
  );
};
export default TodoManagerForm;
