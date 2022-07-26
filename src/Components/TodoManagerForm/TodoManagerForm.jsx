import logo from "../../logo.svg";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/model/hooks";
import {
  createTodoForUser,
  deleteTodoForUser,
  editTodoForUser,
  selectTodoList,
} from "../../lib/model/reducers/todos";
import {
  selectLoadingTodoList,
  selectLoadingUser,
} from "../../lib/model/reducers/ui";
import { getUser, selectUserId } from "../../lib/model/reducers/user";
import FunForm from "../FunForm/FunForm";
import ListContent from "./ListContent";
import Header from "./Header";

const TodoManagerForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const todoList = useAppSelector(selectTodoList);
  const loadingTodoList = useAppSelector(selectLoadingTodoList);
  const loadingUser = useAppSelector(selectLoadingUser);

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
          <div className="flex flex-col justify-center min-h-screen sm:mx-auto sm:max-w-xl">
            <form className="grow flex flex-col gap-3 justify-between items-stretch px-2 sm:px-10 bg-slate-100">
              <img src={logo} className="self-start h-6 mt-8 mb-4" alt="logo" />

              <Header
                loadingUser={loadingUser}
                loadingTodoList={loadingTodoList}
                todoList={todoList}
              />

              <label className="relative h-10 my-5">
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className="absolute h-10 bg-slate-100 px-0 border-0 focus:ring-0 focus:border-0"
                />
                <span
                  className={`${
                    values.title === "" || "hidden"
                  } absolute left-0 h-10 leading-10 text-gray-500`}
                >
                  Add a pending task...
                </span>
              </label>

              <ListContent
                loadingTodoList={loadingTodoList}
                userId={userId}
                initialList={todoList}
                onEditItem={editTodo}
                onDeleteItem={deleteTodo}
              />

              <button
                className="bg-white rounded-3xl my-5 py-2 shadow-md text-gray-500 hover:bg-black hover:text-white"
                onClick={handleSubmit}
              >
                Agregar
              </button>
            </form>
          </div>
        );
      }}
    </FunForm>
  );
};

export default TodoManagerForm;
