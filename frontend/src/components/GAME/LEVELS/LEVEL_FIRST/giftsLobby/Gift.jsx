import { useDrag } from "react-dnd";

import styles from "./Gift.module.css";

const Gift = ({ id, name, onShowModal, backgroundColor }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "gift",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      id={id}
      ref={drag}
      style={{
        filter: isDragging ? "brightness(0.5)" : "brightness(1)",
        backgroundColor: backgroundColor,
      }}
      className={styles.gift}
      onClick={(e) => onShowModal(e)}
    >
      {name}
    </button>
  );
};

export default Gift;
