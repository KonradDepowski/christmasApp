import { useNavigate } from "react-router";
import Backdrop from "../Backdrop";
import styles from "./LevelCompleted.module.css";
const LevelCompleted = () => {
  const navigate = useNavigate();
  return (
    <>
      <Backdrop />
      <div className={styles.level}>
        <h1>Congratulations</h1>
        <p>You did it! Thanks for your help!</p>
        <button onClick={() => navigate("/game")}>Go to Lobby</button>
      </div>
    </>
  );
};

export default LevelCompleted;
