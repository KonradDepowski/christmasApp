import styles from "./LevelFirst.module.css";
import { useDispatch, useSelector } from "react-redux";

import TaskInfo from "./modal/TaskInfo";
import Container from "./gifsContainer/GiftsContainer";
import Gifts from "./giftsLobby/Gifts";
import {
  addToContainer,
  addToPresents,
  clearLevelGame,
  fetchContent2,
} from "../../../../store/gameLevel/presentSlice";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { createTransition } from "react-dnd-multi-backend";

import { DndProvider } from "react-dnd-multi-backend";
import GameResult from "../../../UI/levels/GameResult";
import useConfigureLevel from "../../../../util/hooks/useConfigureLevel";
import { useEffect, useState } from "react";
import { checkResultGameLevel } from "../../../../util/api";
import useFetchLevel from "../../../../util/hooks/useFechLevel";
import LevelCompleted from "../../../UI/levels/LevelCompleted";
import LoaderSpinner from "../../../../components/UI/LoaderSpinner";

const LevelFirst = () => {
  const dispatch = useDispatch();
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [gameResult, setGameResult] = useState(false);
  const container = useSelector((state) => state.gameLevelFirst.containerPre);
  const presents = useSelector((state) => state.gameLevelFirst.presents);
  const isLoading = useSelector((state) => state.gameLevelFirst.isLoading);
  const error = useSelector((state) => state.gameLevelFirst.error);

  const {
    showModal,
    taskId,
    gameOver,
    showModalHandler,
    closeModalHandler,
    endGameHandler,
    setGameIsOver,
  } = useConfigureLevel(null, gameResult);

  const level = useFetchLevel();

  useEffect(() => {
    if (level > 1) {
      setLevelCompleted(true);
    }
  }, [level]);

  useEffect(() => {
    dispatch(fetchContent2());
  }, [dispatch]);

  useEffect(() => {
    if (gameResult) {
      dispatch(clearLevelGame());
    }
  }, [gameResult]);

  if (isLoading) {
    return <LoaderSpinner style={styles.spinner} />;
  }

  if (error) {
    throw new Error("Could not fetch data");
  }

  const checkResultHandler = async () => {
    const data = await checkResultGameLevel("first", container);
    setGameResult(data.result);
    setGameIsOver(true);
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

  return (
    <>
      <DndProvider options={HTML5toTouch}>
        {showModal && (
          <TaskInfo itemId={taskId} onCloseModal={closeModalHandler} />
        )}
        {gameOver && (
          <GameResult
            onEndGame={endGameHandler}
            resultGame={gameResult}
            descriptionWin="You did it! Thanks for your help! Now santa can deliver the presents to children"
            level={1}
          />
        )}

        <section className={styles.main}>
          {levelCompleted && <LevelCompleted />}
          <div className={styles.wrap}>
            <Container
              data={container}
              onAddToSection={(id) => dispatch(addToContainer(id))}
              onShowModal={() => {}}
              onCheckResult={checkResultHandler}
            />
            <Gifts
              presents={presents}
              onAddToSections={(id) => dispatch(addToPresents(id))}
              onShowModal={(e) => showModalHandler(e)}
            />
          </div>
        </section>
      </DndProvider>
    </>
  );
};

export default LevelFirst;
