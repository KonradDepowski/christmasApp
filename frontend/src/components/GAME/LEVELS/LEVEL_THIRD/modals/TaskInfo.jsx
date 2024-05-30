import Backdrop from "../../../../UI/Backdrop";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { changeRecordValue } from "../../../../../store/gameLevel/recordSlice";

import styles from "./TaskInfo.module.css";

const TaskInfo = ({ id, onCloseModal, records }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const data = records.find((item) => item._id === id);

  const checkTheAnswerHandler = (e) => {
    e.preventDefault();
    const answer = inputRef.current.value;
    dispatch(changeRecordValue({ id: id, value: answer }));
    onCloseModal();
  };

  return (
    <>
      <Backdrop onCloseModal={onCloseModal} />
      <div className={styles.modal}>
        <h3>Guess the song</h3>
        <video className={styles.video} autoPlay>
          <source src={data.video} type="video/mp4" />
        </video>
        <form onSubmit={checkTheAnswerHandler} className={styles.form}>
          <label>
            <input ref={inputRef} type="text" placeholder="Enter a song name" />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default TaskInfo;
