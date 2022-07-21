import { useState } from "react";
import "./ItemList.css";
export default function ItemList({ initialList, children }) {
  const items = initialList;

  const [mouseIsOverId, setMouseIsOverId] = useState(false);

  const handleMouseOver = (itemToPutOver) => {
    setMouseIsOverId(itemToPutOver.id);
  };
  const handleMouseOut = () => {
    setMouseIsOverId(false);
  };

  return children({ items, mouseIsOverId, handleMouseOver, handleMouseOut });
}
