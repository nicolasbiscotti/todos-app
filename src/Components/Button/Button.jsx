import React from "react";
import "./Button.css";

export default function Button(props) {
  const attributes = props.attributes || {};
  return <button {...attributes}>{props.children()}</button>;
}
