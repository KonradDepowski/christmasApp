import { useEffect, useState } from "react";
import Gift from "../giftsLobby/Gift";
import SummaryGame from "../modal/SummaryGame";

import { useDrop } from "react-dnd";

import styles from "./GiftsContainer.module.css";

const GiftsContainer = ({
  onAddToSection,
  data,
  onShowModal,
  onCheckResult,
}) => {
  const [gifts, setGifts] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "gift",
    drop: (item) => onAddToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (gifts.length === 8) {
      setEndGame(true);
    } else {
      setEndGame(false);
    }

    setGifts(data);
  }, [data, gifts]);

  return (
    <>
      <div className={styles.container} ref={drop}>
        <h1>Level 1</h1>
        <div
          className={
            isOver
              ? `${styles.gifts_container} ${styles.gifts_container_over}`
              : styles.gifts_container
          }
        >
          {gifts.map((item) => {
            return (
              <Gift
                key={item._id}
                id={item._id}
                backgroundColor={item.backgroundColor}
                name={item.name}
                onShowModal={onShowModal}
              />
            );
          })}
        </div>
      </div>
      {endGame && <SummaryGame onCheckResult={onCheckResult} />}
    </>
  );
};

export default GiftsContainer;
