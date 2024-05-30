import { useRef, useState } from "react";

import Backdrop from "../../../../UI/Backdrop";
import { useDispatch } from "react-redux";
import { changeLetterValue } from "../../../../../store/gameLevel/letterSlice";

import { TbBulbFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./TaskInfoModal.module.css";

const TaskInfoModal = ({ onCloseModal, itemId, letters }) => {
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const data = letters.find((item) => item._id === itemId);

  const checkTheAnswerHandler = (e) => {
    e.preventDefault();
    const answer = inputRef.current.value;
    dispatch(changeLetterValue({ id: itemId, value: answer }));
    onCloseModal();
  };

  const showHintHandler = () => {
    setShowHint((prev) => !prev);
  };
  return (
    <>
      <Backdrop onCloseModal={onCloseModal} />
      <div className={styles.modal}>
        <div className={styles.content}>
          <h3>Dear Santa,</h3>
          <p>{data.code}</p>
        </div>
        <button onClick={showHintHandler} className={styles.icon}>
          <TbBulbFilled />
        </button>

        <div className={styles.hint}>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ y: 50, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <p>Try with {data.hint} encrypt</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <form className={styles.form} method="POST">
          <label>
            <input
              className={styles.input}
              type="text"
              ref={inputRef}
              placeholder="Answer (the dream gift)"
            />
          </label>
          <button onClick={checkTheAnswerHandler} className={styles.btn}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskInfoModal;
