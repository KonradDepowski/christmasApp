import styles from "./Backdrop.module.css";
function Backdrop({ children, onCloseModal }) {
  return (
    <div onClick={onCloseModal} className={styles.backdrop}>
      {children}
    </div>
  );
}

export default Backdrop;
