import React, { useEffect, useState } from "react";
import Cupcake from "../cupcakeLobby/Cupcake";

import { useDrop } from "react-dnd";

import styles from "./CupcakesContainer.module.css";

const CupcakesContainer = ({ onAddToSection, data }) => {
  const [cupcakes, setCupcakes] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "cupcake",
    drop: (id) => onAddToSection(id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    setCupcakes(data);
  }, [data, cupcakes]);

  return (
    <>
      <div className={styles.container} ref={drop}>
        <h1>Level 4</h1>
        <div
          className={
            isOver
              ? `${styles.cupcakes_container} ${styles.cupcakes_container_over}`
              : styles.cupcakes_container
          }
        >
          {cupcakes.map((item) => {
            return (
              <Cupcake
                key={item._id}
                id={item._id}
                name={item.name}
                colorBg={item.valid}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CupcakesContainer;
