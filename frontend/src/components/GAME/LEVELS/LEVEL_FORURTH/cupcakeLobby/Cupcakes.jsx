import Cupcake from "./Cupcake.jsx";
import { useEffect, useState } from "react";

import { useAnimate } from "framer-motion";

import styles from "./Cupcakes.module.css";

const Cupcakes = ({
  cupcakesListFirst,
  cupcakesListSecond,
  cupcakesListThird,
  onShowModal,
  isOverGame,
  antoherTry,
}) => {
  const [cupcakesContainerFirst, animateFirst] = useAnimate();
  const [cupcakesContainerSecond, animateSecond] = useAnimate();
  const [cupcakesContainerThird, animateThird] = useAnimate();

  useEffect(() => {
    animateFirst(
      cupcakesContainerFirst.current,
      { x: -800 },
      { delay: 2, duration: 7 }
    );
    animateSecond(
      cupcakesContainerSecond.current,
      { x: -800 },
      { delay: 1.5, duration: 7 }
    );
    animateThird(
      cupcakesContainerThird.current,
      { x: -800 },
      { delay: 3, duration: 8 }
    );
  }, [antoherTry]);

  useEffect(() => {
    if (cupcakesListFirst && cupcakesListSecond && cupcakesListThird) {
      animateFirst(
        cupcakesContainerFirst.current,
        { x: -800 },
        { delay: 1, duration: 7 }
      );
      animateSecond(
        cupcakesContainerSecond.current,
        { x: -800 },
        { delay: 1, duration: 5 }
      );
      animateThird(
        cupcakesContainerThird.current,
        { x: -800 },
        { delay: 1, duration: 10 }
      );
    }
  }, []);
  useEffect(() => {
    if (isOverGame) {
      animateFirst(cupcakesContainerFirst.current, { x: 0 });
      animateSecond(cupcakesContainerSecond.current, { x: 0 });
      animateThird(cupcakesContainerThird.current, { x: 0 });
    }
  }, [isOverGame]);

  return (
    <div className={styles.cupcakes}>
      <div ref={cupcakesContainerFirst} className={styles.cupcakes_wrap_first}>
        {cupcakesListFirst.map((item) => (
          <Cupcake
            key={item._id}
            id={item._id}
            colorBg={item.valid}
            onShowModal={(e) => onShowModal(e)}
          />
        ))}
      </div>
      <div
        ref={cupcakesContainerSecond}
        className={styles.cupcakes_wrap_second}
      >
        {cupcakesListSecond.map((item) => (
          <Cupcake
            key={item._id}
            id={item._id}
            colorBg={item.valid}
            onShowModal={(e) => onShowModal(e)}
          />
        ))}
      </div>
      <div ref={cupcakesContainerThird} className={styles.cupcakes_wrap_third}>
        {cupcakesListThird.map((item) => (
          <Cupcake
            key={item._id}
            id={item._id}
            colorBg={item.valid}
            onShowModal={(e) => onShowModal(e)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cupcakes;
