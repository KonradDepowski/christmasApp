import Backdrop from "../Backdrop";
import Firework from "../Firework";
import styles from "./GameCompletedResult.module.css";
import { motion } from "framer-motion";

const GameCompletedResult = () => {
  return (
    <>
      <Backdrop />
      <motion.div
        initial={{ y: "-70%", x: "-50%", opacity: 0.5, scale: 0.9 }}
        animate={{ y: "-50%", x: "-50%", opacity: 1, scale: 1 }}
        className={styles.game}
      >
        <div className={styles.wrap}>
          <h1>Congratulations</h1>
          <p>
            Thanks for your help! Now Christmas Landing can prepar properly
            gifts for children and make a happy Christmas to everyone!
          </p>
          <div className={styles.img_wrap}>
            <img
              id="first"
              src="https://www.123gif.de/gifs/nikolaus/nikolaus-hund-zuckerstange-0068.gif"
              alt=" christmas doggy"
            />
            <Firework />
            <img
              id="second"
              src="https://www.123gif.de/gifs/weihnachtsmann/weihnachtsmann-0170.gif"
              alt="santa claus"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default GameCompletedResult;
