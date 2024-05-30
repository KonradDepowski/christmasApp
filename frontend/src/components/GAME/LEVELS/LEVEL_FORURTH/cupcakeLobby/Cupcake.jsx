import { useDrag } from "react-dnd";

import { GiCupcake } from "react-icons/gi";

import styles from "./Cupcake.module.css";

const Cupcake = ({ id, colorBg }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "cupcake",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      key={id}
      id={id}
      ref={drag}
      style={{
        filter: isDragging ? "brightness(0.5)" : "brightness(1)",
      }}
    >
      <GiCupcake
        id={id}
        key={id}
        className={styles.cupcake}
        style={colorBg ? { color: "#FCD47D" } : { color: "black" }}
      />
    </div>
  );
};

export default Cupcake;
