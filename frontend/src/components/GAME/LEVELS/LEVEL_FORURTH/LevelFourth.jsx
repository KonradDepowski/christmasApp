import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CupcakesContainer from "./cupcakesContainer/CupcakesContainer";
import Cupcakes from "./cupcakeLobby/Cupcakes";
import { checkResultGame } from "../../../../store/gameLevel/presentSlice";
import {
  addToContainer,
  checkIsValid,
  clearContainer,
  fetchContent,
} from "../../../../store/gameLevel/cupcakeSlice";
import GameResult from "../../../UI/levels/GameResult";
import useConfigureLevel from "../../../../util/hooks/useConfigureLevel";

import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { createTransition } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd-multi-backend";

import LoaderSpinner from "../../../UI/LoaderSpinner";

import styles from "./LevelFourth.module.css";

const LevelFourth = () => {
  const dispatch = useDispatch();
  const container = useSelector((state) => state.gameLevelFourth.container);
  const cupcakes = useSelector((state) => state.gameLevelFourth.cupcakes);
  const isLoading = useSelector((state) => state.gameLevelFirst.isLoading);
  const error = useSelector((state) => state.gameLevelFirst.error);
  const cupcakesListFirst = cupcakes.filter((item) => item.cat === "first");
  const cupcakesListSecond = cupcakes.filter((item) => item.cat === "second");
  const cupcakesListThird = cupcakes.filter((item) => item.cat === "third");
  const resultGame = useSelector((state) => state.gameLevelFourth.result);
  const navigate = useNavigate();
  const [antoherTry, setAnotherTry] = useState(false);
  const { gameOver, showModalHandler, setGameIsOver } = useConfigureLevel(
    null,
    isLoading,
    error,
    resultGame
  );

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const checkResultHandler = () => {
    dispatch(checkResultGame());
    setGameIsOver(true);
  };

  const endGameHandler = () => {
    if (resultGame) {
      navigate("/game");
    } else {
      setAnotherTry((prev) => !prev);
      dispatch(clearContainer());
      setGameIsOver(false);
    }
  };

  const TouchTransition = createTransition("touchstart", (event) => {
    return event.touches != null;
  });

  const HTML5toTouch = {
    backends: [
      {
        id: "html5",
        backend: HTML5Backend,
      },
      {
        id: "touch",
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };

  useEffect(() => {
    dispatch(clearContainer());
    let ti = setTimeout(() => {
      setGameIsOver(true);
      dispatch(checkIsValid());
    }, 10000);
    return () => clearTimeout(ti);
  }, [setGameIsOver, dispatch]);
  useEffect(() => {
    let ti = setTimeout(() => {
      setGameIsOver(true);
      dispatch(checkIsValid());
    }, 10000);
    dispatch(fetchContent());
    return () => clearTimeout(ti);
  }, [gameOver]);

  if (isLoading) {
    return <LoaderSpinner style={styles.spinner} />;
  }

  if (error) {
    throw new Error("Could not fetch data");
  }

  return (
    <DndProvider options={HTML5toTouch}>
      {gameOver && (
        <GameResult
          onEndGame={endGameHandler}
          resultGame={resultGame}
          descriptionWin="You did it! Thanks for your help! Now snowman can pack a good cupcakes to the presents"
          level={4}
        />
      )}

      <section className={styles.main}>
        <div className={styles.wrap}>
          <CupcakesContainer
            data={container}
            onShowModal={() => {}}
            onCheckResult={checkResultHandler}
            onAddToSection={(id) => dispatch(addToContainer(id))}
          />
          <Cupcakes
            cupcakesListFirst={cupcakesListFirst}
            cupcakesListSecond={cupcakesListSecond}
            cupcakesListThird={cupcakesListThird}
            onShowModal={(e) => showModalHandler(e)}
            isOverGame={gameOver}
            antoherTry={antoherTry}
          />
        </div>
      </section>
    </DndProvider>
  );
};

export default LevelFourth;
