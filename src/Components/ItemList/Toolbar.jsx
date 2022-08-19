import { useAppDispatch, useAppSelector } from "../../lib/model/hooks";
import { byCompletionOptions } from "../../lib/model/reducers/filters";
import { resetTodoListForUser } from "../../lib/model/reducers/todos";
import {
  hideModal,
  selectShowModal,
  showModal,
} from "../../lib/model/reducers/ui";
import Modal from "../Modal/Modal";
import SelectMenu from "../SelectMenu/SelectMenu";

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(selectShowModal);

  const resetTodos = () => {
    dispatch(resetTodoListForUser());
    dispatch(hideModal());
  };

  return (
    <div className="flex items-center gap-3">
      <h4>To-dos list</h4>

      <button type="button" onClick={() => dispatch(showModal())}>
        <svg
          className="h-6 w-6 flex-none fill-black stroke-white stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" fill="none" />
          <line x1="8" y1="12" x2="16" y2="12" fill="none" />
        </svg>
        <span className="hidden">clear todo list</span>
      </button>

      {modalIsOpen && (
        <Modal onAccept={resetTodos} onCancel={() => dispatch(hideModal())} />
      )}

      <div className="grow">
        <SelectMenu options={byCompletionOptions} />
      </div>
    </div>
  );
}
