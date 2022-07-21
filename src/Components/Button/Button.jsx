import "./Button.css";

export default function Button({attributes, children}) {
  const theAttributes = attributes || {};
  return <button {...attributes}>{children()}</button>;
}
