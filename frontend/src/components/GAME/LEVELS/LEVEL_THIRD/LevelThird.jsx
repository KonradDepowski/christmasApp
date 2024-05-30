import TaskInfo from "./modals/TaskInfo";
import { useDispatch, useSelector } from "react-redux";
import GameResult from "../../../UI/levels/GameResult";
import useConfigureLevel from "../../../../util/hooks/useConfigureLevel";
import Record from "./Record";
import { useEffect, useState } from "react";
import { fetchContent } from "../../../../store/gameLevel/recordSlice";
import useFetchLevel from "../../../../util/hooks/useFechLevel";
import LevelCompleted from "../../../UI/levels/LevelCompleted";
import LoaderSpinner from "../../../UI/LoaderSpinner";

import styles from "./LevelThird.module.css";

const LevelThird = () => {
  const dispatch = useDispatch();
  const [levelCompleted, setLevelCompleted] = useState(false);
  const records = useSelector((state) => state.gameLevelThird.records);
  const isLoadingData = useSelector((state) => state.gameLevelThird.isLoading);
  const error = useSelector((state) => state.gameLevelThird.error);
  const {
    showModal,
    taskId,
    gameOver,
    gameResult,
    isLoading,
    showModalHandler,
    closeModalHandler,
    endGameHandler,
  } = useConfigureLevel(records);

  const level = useFetchLevel();

  useEffect(() => {
    if (level > 3) {
      setLevelCompleted(true);
    }
  }, [level]);

  useEffect(() => {
    dispatch(fetchContent());
  }, []);
  if (isLoadingData) {
    return <LoaderSpinner style={styles.spinner} />;
  }

  if (error) {
    throw new Error("Could not fetch data");
  }

  return (
    <>
      {gameOver && (
        <GameResult
          onEndGame={endGameHandler}
          resultGame={gameResult}
          descriptionWin="You did it! Thanks for your help! Now every family can be hear a beauty of christmas music"
          level={3}
        />
      )}
      {showModal && (
        <TaskInfo
          records={records}
          id={taskId}
          onCloseModal={closeModalHandler}
        />
      )}
      {isLoading && <LoaderSpinner style={styles.spinner} title="Checking" />}

      <div className={styles.main}>
        {levelCompleted && <LevelCompleted />}
        <div className={styles.wrap}>
          <h1>Level 3</h1>
          <div className={styles.records}>
            {records.map((item) => (
              <Record
                id={item._id}
                onShowModal={(e) => showModalHandler(e)}
                key={item._id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelThird;
