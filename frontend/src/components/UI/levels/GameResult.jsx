import styles from "./GameResult.module.css";
import Backdrop from "../Backdrop";
import { updateUserLevel } from "../../../util/api";

const GameResult = ({ onEndGame, resultGame, descriptionWin, level }) => {
  let title;
  let description;
  let btn;
  if (resultGame === true) {
    title = "Congratulations";
    description = descriptionWin;
    btn = "Go to Lobby";
    updateUserLevel(level);
  } else {
    title = "Unfortunately";
    description = "You made a mistake! Try again! ";
    btn = "Try again";
  }

  return (
    <>
      <Backdrop />
      <div
        className={
          !resultGame ? `${styles.modal_wrong} ${styles.modal}` : styles.modal
        }
      >
        <h3 className={!resultGame ? styles.wrong_h3 : ""}>{title}</h3>
        <p>{description}</p>
        <button
          onClick={onEndGame}
          className={!resultGame ? styles.wrong_btn : ""}
        >
          {btn}
        </button>
      </div>
    </>
  );
};

export default GameResult;
