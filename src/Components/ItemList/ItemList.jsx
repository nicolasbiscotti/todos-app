import { useState } from "react";
import "./ItemList.css";
function ItemList({ initialList, onEditItem, onDeleteItem, children }) {
  const [mouseOverId, setMouseOverId] = useState(false);

  const items = initialList.map((item) => ({
    ...item,
    setMouseOver: () => setMouseOverId(item.id),
    setMouseOut: () => setMouseOverId(false),
    editItem: (event) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      item[name] = value;
      onEditItem(item);
    },
    deleteItem: () => onDeleteItem(item),
  }));

  return children({ items, mouseOverId });
}
export default ItemList;
