import { useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/model/hooks";
import {
  selectFilterByCompletionId,
  selectFilterByCompletionText,
} from "../../lib/model/reducers/filters";
import { filterByCompletion } from "../../lib/model/reducers/todos";

const initialState = {
  isOpen: false,
  mouseOver: "",
};

const selectIsOpen = (state) => state.isOpen;
const selectMouseOverId = (state) => state.mouseOver.id;

const OPEN_MENU = "open menu";
const CLOSE_MENU = "close menu";
const SET_OPTION = "select option";
const SET_MOUSE_OVER = "set mouse over";
const CLEAR_MOUSE_OVER = "clear mouse over";

const openMenu = () => ({ type: OPEN_MENU });
const closeMenu = () => ({ type: CLOSE_MENU });
const setOption = (option) => ({ type: SET_OPTION, payload: option });
const setMouseOver = (option) => ({ type: SET_MOUSE_OVER, payload: option });
const clearMouseOver = () => ({ type: CLEAR_MOUSE_OVER });

const reducer = (state, { type, payload }) => {
  switch (type) {
    case OPEN_MENU:
      return { ...state, isOpen: true };
    case CLOSE_MENU:
      return { ...state, isOpen: false };
    case SET_OPTION:
      return { ...state, selectedOption: payload };
    case SET_MOUSE_OVER:
      return { ...state, mouseOver: payload };
    case CLEAR_MOUSE_OVER:
      return { ...state, mouseOver: "" };
    default:
      return state;
  }
};

export default function SelectMenu({ options }) {
  const appDispatch = useAppDispatch();
  const selectedOptionId = useAppSelector(selectFilterByCompletionId);
  const selectedOptionText = useAppSelector(selectFilterByCompletionText);

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSelectAnOption = (option) => {
    dispatch(setOption(option));
    appDispatch(filterByCompletion(option));
    dispatch(closeMenu());
  };

  const onToggle = () => {
    if (selectIsOpen(state)) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  };

  const items = options.map((option) => {
    const isSelected = option.id === selectedOptionId;
    const mouseIsOver = option.id === selectMouseOverId(state);
    return (
      <li
        key={option.id}
        className={`text-gray-900 ${
          mouseIsOver && "text-white bg-indigo-600"
        } cursor-default select-none relative py-2 pl-3 pr-9`}
        id={option.id}
        role="option"
        onClick={() => onSelectAnOption(option)}
        onMouseEnter={() => dispatch(setMouseOver(option))}
        onMouseLeave={() => dispatch(clearMouseOver())}
      >
        <div className="flex items-center">
          <span
            className={`font-normal ${
              isSelected && "font-semibold"
            } ml-3 block truncate`}
          >
            {option.text}
          </span>
        </div>
        {isSelected && (
          <span
            className={`text-indigo-600 ${
              mouseIsOver && "text-white"
            } absolute inset-y-0 right-0 flex items-center pr-4`}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </li>
    );
  });

  return (
    <div className="relative text-sm">
      <label id="listbox-label">
        <span className="hidden">Filter by</span>
        <button
          type="button"
          className={`relative w-full sm:w-1/2 bg-white border border-gray-300 
                      rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default 
                      focus:outline-none focus:ring-1 focus:ring-indigo-500
                      focus:border-indigo-500 sm:text-sm`}
          aria-haspopup="listbox"
          aria-expanded={selectIsOpen(state)}
          aria-labelledby="listbox-label"
          onClick={onToggle}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selectedOptionText}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </label>

      <ul
        className={`${selectIsOpen(state) || "hidden"}
                    absolute z-10 mt-1 w-full sm:w-1/2 bg-white shadow-lg max-h-56 
                    rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 
                    overflow-auto focus:outline-none sm:text-sm`}
        tabIndex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant={selectedOptionId}
      >
        {items}
      </ul>
    </div>
  );
}
