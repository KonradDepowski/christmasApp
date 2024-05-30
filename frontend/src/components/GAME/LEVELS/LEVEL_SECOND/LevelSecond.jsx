import styles from "./LevelSecond.module.css";
import Letter from "./letters/Letter";
import TaskInfoModal from "./modals/TaskInfoModal";
import { useDispatch, useSelector } from "react-redux";
import GameResult from "../../../UI/levels/GameResult";
import useConfigureLevel from "../../../../util/hooks/useConfigureLevel";
import { useEffect, useState } from "react";
import { fetchContent } from "../../../../store/gameLevel/letterSlice";
import useFetchLevel from "../../../../util/hooks/useFechLevel";
import LevelCompleted from "../../../UI/levels/LevelCompleted";
import LoaderSpinner from "../../../UI/LoaderSpinner";
const LevelSecond = () => {
  const [levelCompleted, setLevelCompleted] = useState(false);
  const letters = useSelector((state) => state.gameLevelSecond.letters);
  const isLoadingData = useSelector((state) => state.gameLevelSecond.isLoading);
  const error = useSelector((state) => state.gameLevelSecond.error);
  const dispatch = useDispatch();

  const level = useFetchLevel();

  const {
    showModal,
    taskId,
    gameOver,
    gameResult,
    isLoading,
    showModalHandler,
    closeModalHandler,
    endGameHandler,
  } = useConfigureLevel(letters);

  useEffect(() => {
    if (level > 2) {
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
          descriptionWin="You did it! Thanks for your help! Now elves can pack correct presents"
          level={2}
        />
      )}
      {isLoading && <LoaderSpinner style={styles.spinner} title="Checking" />}
      {showModal && (
        <TaskInfoModal
          letters={letters}
          itemId={taskId}
          onCloseModal={closeModalHandler}
        />
      )}

      <div className={styles.main}>
        {levelCompleted && <LevelCompleted />}
        <div className={styles.wrap}>
          <h1>Level 2</h1>
          <div className={styles.wrap_letters}>
            {letters.map((item) => (
              <Letter
                onShowModal={(e) => showModalHandler(e)}
                key={item._id}
                id={item._id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelSecond;
