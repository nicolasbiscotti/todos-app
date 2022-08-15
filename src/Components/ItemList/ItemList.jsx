import { useState } from "react";

function ItemList({ initialList, onEditItem, onDeleteItem, children }) {
  const [mouseOverId, setMouseOverId] = useState(false);

  const items = initialList.map((item) => ({
    ...item,
    mouseIsOver: () => item.id === mouseOverId,
    setMouseOver: () => setMouseOverId(item.id),
    setMouseOut: () => setMouseOverId(false),
    editItem: () => onEditItem(item),
    deleteItem: () => onDeleteItem(item),
  }));

  return children({ items, mouseOverId });
}

export default ItemList;
