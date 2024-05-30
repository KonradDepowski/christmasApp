import { useDispatch, useSelector } from "react-redux";
import Backdrop from "../../../../UI/Backdrop";
import { useRef } from "react";
import { changeValueTask } from "../../../../../store/gameLevel/presentSlice";

import { IoMdClose } from "react-icons/io";

import styles from "./TaskInfo.module.css";

const TaskInfo = ({ onCloseModal, itemId }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.gameLevelFirst.presents);
  const id = itemId;
  const item = items.find((item) => item._id === id);
  const task = item.task;

  const taskResultHandler = (e) => {
    e.preventDefault();
    const valueTask = inputRef.current.value;
    dispatch(changeValueTask({ id, valueTask }));
    onCloseModal();
  };

  return (
    <>
      <Backdrop onCloseModal={onCloseModal} />
      <div className={styles.modal}>
        <button className={styles.icon}>
          <IoMdClose onClick={onCloseModal} />
        </button>
        <span>{task}</span>
        <form onSubmit={taskResultHandler} className={styles.form}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Result"
          />
          <button type="submit" className={styles.button}>
            Confirm
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskInfo;
