import Gift from "./Gift";
import reindeer from "../../../../../assets/game/LEVEL_FIRST/renifer.webp";

import { useDrop } from "react-dnd";

import styles from "./Gifts.module.css";

const Gifts = ({ presents, onAddToSections, onShowModal }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "gift",
    drop: (item) => onAddToSections(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className={styles.gifts} ref={drop}>
      <div
        className={
          isOver
            ? `${styles.gifts_wrap} ${styles.gifts_over}`
            : styles.gifts_wrap
        }
      >
        {presents.map((item) => (
          <Gift
            key={item._id}
            id={item._id}
            name={item.name}
            backgroundColor={item.backgroundColor}
            onShowModal={(e) => onShowModal(e)}
          />
        ))}
      </div>
      <img
        className={styles.img}
        src={reindeer}
        fetchpriority="high"
        alt="christmas reindeer"
      />
    </div>
  );
};

export default Gifts;
